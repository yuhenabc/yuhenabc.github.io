title: Ansible 命令及其使用指南
date: 2024-05-16 10:55:17
category: 知识备忘
tags: tools

---

Ansible 是一个强大的自动化工具，用于配置管理、应用部署和任务自动化。以下是一些常见的 Ansible 命令及其使用指南，帮助你更好地管理和自动化你的基础设施。

### 1. 安装 Ansible

在大多数 Linux 发行版中，你可以使用包管理器来安装 Ansible。例如，在 Ubuntu 上：

```sh
sudo apt update
sudo apt install ansible
```

在 CentOS 上：

```sh
sudo yum install epel-release
sudo yum install ansible
```

### 2. 检查 Ansible 版本

```sh
ansible --version
```

### 3. 配置 Ansible

Ansible 的配置文件通常位于 `/etc/ansible/ansible.cfg`。你可以在这里设置各种配置选项，例如库存文件路径、日志级别等。

### 4. 创建和管理库存文件

库存文件（Inventory File）定义了你要管理的主机和组。默认的库存文件路径是 `/etc/ansible/hosts`，但你也可以使用自定义路径。

#### 示例库存文件

```ini
# /etc/ansible/hosts
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
db2.example.com
```

### 5. 测试连接

使用 `ansible` 命令测试与主机的连接：

```sh
ansible all -m ping
```

这会向所有主机发送一个 `ping` 模块，检查它们是否可以被 Ansible 管理。

### 6. 运行 Ad-Hoc 命令

Ad-Hoc 命令是临时性的命令，用于快速执行任务。

#### 示例：在所有主机上安装 Apache

```sh
ansible all -m yum -a "name=httpd state=present"
```

#### 示例：在所有主机上启动 Apache 服务

```sh
ansible all -m service -a "name=httpd state=started"
```

### 7. 运行 Playbook

Playbook 是 YAML 文件，定义了一系列的任务和配置。使用 `ansible-playbook` 命令来运行 Playbook。

#### 示例 Playbook (`site.yml`)

```yaml
---
- hosts: webservers
  become: yes
  tasks:
    - name: Ensure Apache is installed
      yum:
        name: httpd
        state: present

    - name: Ensure Apache is started
      service:
        name: httpd
        state: started
        enabled: yes
```

become 代表是否提升权限，默认提升到 root 用户。tasks 可以串联地执行多个任务。而 yum 和 service 分别是两个模块的名称。

#### 运行 Playbook

```sh
ansible-playbook site.yml
```

由于 Playbook 的方式要比 Ad-Hoc 方式更加直观地展示模块的功能，接下来的例子都会使用 Playbook。

### 8. 查看和管理模块

Ansible 提供了大量的模块，用于执行各种任务。你可以使用以下命令查看可用模块：

```sh
ansible-doc -l
```

查看特定模块的详细信息：

```sh
ansible-doc yum
```

### 9. 使用 Vault 加密敏感信息

Ansible Vault 用于加密敏感信息，如密码和密钥。

#### 创建加密文件

```sh
ansible-vault create secrets.yml
```

#### 编辑加密文件

```sh
ansible-vault edit secrets.yml
```

#### 运行 Playbook 时解密

```sh
ansible-playbook site.yml --ask-vault-pass
```

### 10. 使用动态库存

动态库存脚本可以从外部数据源（如 AWS、OpenStack 等）动态生成库存文件。

#### 示例：使用 AWS 动态库存

安装 `boto` 库：

```sh
pip install boto
```

创建 `aws_ec2.py` 和 `aws_ec2.ini` 文件，然后在 Playbook 中指定动态库存：

```sh
ansible-playbook site.yml -i aws_ec2.py
```

### 11. 查看和管理主机状态

使用 `setup` 模块查看主机的状态和变量：

```sh
ansible all -m setup
```

### 12. 调试 Playbook

使用 `-vvv` 选项增加输出的详细程度，帮助调试 Playbook：

```sh
ansible-playbook site.yml -vvv
```

### 13. 限制 Playbook 的执行范围

使用 `--limit` 选项限制 Playbook 的执行范围：

```sh
ansible-playbook site.yml --limit web1.example.com
```

### 14. 检查 Playbook 的语法

使用 `--syntax-check` 选项检查 Playbook 的语法：

```sh
ansible-playbook site.yml --syntax-check
```

### 15. 并行执行任务

使用 `--forks` 选项指定并行执行任务的数量：

```sh
ansible-playbook site.yml --forks 10
```

Ansible 提供了大量内置模块，用于执行各种任务，从简单的文件操作到复杂的系统配置。以下是一些常用的 Ansible 模块及其功能介绍：

### 1. 文件和目录操作

#### `file`

**用途**：管理文件、目录和符号链接的状态。

```yaml
- name: Ensure directory exists
  file:
    path: /path/to/directory
    state: directory
    mode: '0755'
```

#### `copy`

**用途**：复制文件到远程节点。

```yaml
- name: Copy file to remote host
  copy:
    src: /local/path/to/file
    dest: /remote/path/to/file
    owner: user
    group: group
    mode: '0644'
```

#### `template`

**用途**：将 Jinja2 模板文件渲染并复制到远程节点。

```yaml
- name: Render template to remote host
  template:
    src: /local/path/to/template.j2
    dest: /remote/path/to/file
    owner: user
    group: group
    mode: '0644'
```

#### `lineinfile`

**用途**：确保一行存在于文件中或替换现有行。

```yaml
- name: Ensure line is in file
  lineinfile:
    path: /etc/hosts
    line: '127.0.0.1 ansible_host'
    state: present
```

#### `blockinfile`

**用途**：确保一个块存在于文件中或替换现有块。

```yaml
- name: Ensure block is in file
  blockinfile:
    path: /etc/hosts
    block: |
      127.0.0.1 ansible_host
      127.0.0.2 another_host
    marker: '# {mark} ANSIBLE MANAGED BLOCK'
```

### 2. 包管理

#### `yum`

**用途**：管理 Red Hat/CentOS 系统中的软件包。

```yaml
- name: Install Apache
  yum:
    name: httpd
    state: present
```

#### `apt`

**用途**：管理 Debian/Ubuntu 系统中的软件包。

```yaml
- name: Install Apache
  apt:
    name: apache2
    state: present
```

#### `pip`

**用途**：管理 Python 包。

```yaml
- name: Install Flask
  pip:
    name: Flask
    state: present
```

### 3. 服务管理

#### `service`

**用途**：管理服务的状态（启动、停止、重启等）。

```yaml
- name: Start Apache service
  service:
    name: httpd
    state: started
    enabled: yes
```

#### `systemd`

**用途**：管理 systemd 服务单元。

```yaml
- name: Enable and start Apache service
  systemd:
    name: httpd
    state: started
    enabled: yes
```

### 4. 用户和组管理

#### `user`

**用途**：管理用户账户。

```yaml
- name: Create user
  user:
    name: ansible_user
    state: present
    groups: sudo
    shell: /bin/bash
```

#### `group`

**用途**：管理用户组。

```yaml
- name: Create group
  group:
    name: ansible_group
    state: present
```

### 5. 系统配置

#### `sysctl`

**用途**：管理内核参数。

```yaml
- name: Set kernel parameter
  sysctl:
    name: net.ipv4.ip_forward
    value: 1
    state: present
    reload: yes
```

#### `cron`

**用途**：管理定时任务。

```yaml
- name: Add cron job
  cron:
    name: 'Run backup script'
    minute: '0'
    hour: '2'
    job: '/usr/local/bin/backup.sh'
```

### 6. 网络配置

#### `netstat`

**用途**：获取网络连接信息。

```yaml
- name: Get network connections
  netstat:
    gather_subset: all
```

#### `iptables`

**用途**：管理 iptables 规则。

```yaml
- name: Allow port 80
  iptables:
    chain: INPUT
    protocol: tcp
    destination_port: 80
    jump: ACCEPT
    state: present
```

### 7. 数据库管理

#### `mysql_user`

**用途**：管理 MySQL 用户。

```yaml
- name: Create MySQL user
  mysql_user:
    name: ansible_user
    password: secure_password
    priv: '*.*:ALL'
    state: present
```

#### `postgresql_db`

**用途**：管理 PostgreSQL 数据库。

```yaml
- name: Create PostgreSQL database
  postgresql_db:
    name: ansible_db
    state: present
```

### 8. 云服务管理

#### `ec2`

**用途**：管理 Amazon EC2 实例。

```yaml
- name: Launch EC2 instance
  ec2:
    key_name: my_key
    instance_type: t2.micro
    image: ami-123456
    wait: yes
    region: us-west-1
    vpc_subnet_id: subnet-123456
    security_group: my_security_group
    count: 1
```

#### `azure_rm_virtualmachine`

**用途**：管理 Azure 虚拟机。

```yaml
- name: Create Azure VM
  azure_rm_virtualmachine:
    resource_group: myResourceGroup
    name: myVM
    vm_size: Standard_DS1_v2
    admin_username: azureuser
    ssh_password_enabled: no
    ssh_public_keys:
      - path: /home/azureuser/.ssh/authorized_keys
        key_data: "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
```

### 9. 其他常用模块

#### `shell` 和 `command`

**用途**：执行 shell 命令。

```yaml
- name: Run a shell command
  shell: echo "Hello, World!" > /tmp/hello.txt
```

```yaml
- name: Run a command
  command: ls -l /tmp
```

#### `debug`

**用途**：打印调试信息。

```yaml
- name: Debug message
  debug:
    msg: 'This is a debug message'
```

#### `setup`

**用途**：收集远程主机的事实（facts）。

```yaml
- name: Gather facts
  setup:
```
