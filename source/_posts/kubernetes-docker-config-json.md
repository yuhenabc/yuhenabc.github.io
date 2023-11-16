title: 如何实现 kubernetes 从私有镜像仓库拉取镜像
category: 知识备忘
tags: kubernetes
date: 2023-11-16 18:19:39
---

如果我们的镜像位于私有镜像仓库，比如阿里、Coding.net 等，直接拉取注定会失败，因为这时 kubernetes 还没有这些私有镜像仓库的认证信息，也不会尝试登录。

所以，在部署前我们要预先吧私有镜像仓库的认证信息告诉 kubernetes，而告诉 kubernetes 的方式就是配置一个类型为 `dockerconfigjson` 的 Secret

### 首次创建 Secret

假设 Secret 取名为 coding-imooc，首次在 dev 命名空间内创建，则使用如下命令：

```bash
kubectl create secret docker-registry coding-imooc -n dev \
--docker-server=<你的私有镜像仓库域名> \
--docker-username=<你的用户名> \
--docker-password=<你的密码>
```

创建成功后可以用如下命令验证：

```bash
kubectl get secret -A | grep coding-imooc
```

PS：如何使用？

利用 `imagePullSecrets` 字段使用 Secret：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: some-app
spec:
  containers:
    - name: some-app-container
      image: <your-private-image>
  imagePullSecrets:
    - name: coding-imooc
```

当然，得保证你的 Pod 部署命名空间和 Secret 的命名空间是一致的才行！

### 拷贝已有的 Secret 到其它命名空间

#### 第一步：提取已有的 Secret 到 yaml 文件

我们可以先尝试看一下已有的 Secret 的内容：

```bash
kubectl get secret coding-imooc -o yaml -n dev
```

可能打印如下信息：

```yaml
apiVersion: v1
data:
  .dockerconfigjson: ******
kind: Secret
metadata:
  creationTimestamp: "2023-11-15T08:28:27Z"
  name: coding-imooc
  namespace: dev
  resourceVersion: "1184913"
  uid: 3e29da41-b62b-427d-a845-7aaca94cb9ea
type: kubernetes.io/dockerconfigjson
```

将其保存到 `some.yaml` 文件中：

```bash
kubectl get secret coding-imooc -o yaml -n dev > some.yaml
```

删除掉 `creationTimestamp`、`namespace`、`resourceVersion` 和 `uid` 几行，精简之后如下：

```yaml
apiVersion: v1
data:
  .dockerconfigjson: ******
kind: Secret
metadata:
  name: coding-imooc
type: kubernetes.io/dockerconfigjson
```

#### 第二步：利用 yaml 文件在其它命名空间内重新创建 Secret

```bash
# test 命名空间
kubectl apply -f some.yaml -n test
# prod 命名空间
kubectl apply -f some.yaml -n prod
# and so on
```
