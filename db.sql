DROP DATABASE IF EXISTS nestjs_rbac;
CREATE DATABASE IF NOT EXISTS nestjs_rbac DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
USE nestjs_rbac;


-- 插入一些用户数据
INSERT INTO users (username, password, email)
VALUES ('admin', '123456', 'admin@example.com'),
       ('user1', '123456', 'user1@example.com'),
       ('user2', '123456', 'user2@example.com'),
       ('user3', '123456', 'user3@example.com');

-- 插入一些角色数据
INSERT INTO roles (name, remark, description)
VALUES ('admin', '管理员', '管理系统角色'),
       ('editor', '编辑角色', '修改和发布文章'),
       ('viewer', '查看角色', '只能阅读文章'),
       ('remove', '删除角色', '具有删除操作');

-- 插入一些权限数据
INSERT INTO permissions (name, description, identifier, status)
VALUES ('create:post', '创建文章', '创作者', 'active'),
       ('edit:post', '编辑文章', '编辑者', 'active'),
       ('delete:post', '删除文章', '删除者', 'active'),
       ('view:post', '查看文章', '查看者', 'active');

-- 插入一些用户角色关联数据
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (4, 2);

-- 插入一些角色权限关联数据
INSERT INTO role_permissions (role_id, permission_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 2), -- editor can edit_user
       (2, 4), -- editor can view_user
       (3, 4); -- viewer can view_user