INSERT IGNORE INTO employees (
    address,
    cpf,
    email,
    first_name,
    last_name,
    password,
    role
) VALUES (
 '123 Main Street',
 '52998224725',
 'employee@mail.com',
 'employee',
 'user',
 '$2a$10$cMQK3JjnUnOXZMFRkP7XreDiEKucQLg2nGQDvhn193Y26NPjkOuwO',
 'ROLE_EMPLOYEE'
);

INSERT IGNORE INTO employees (
    address,
    cpf,
    email,
    first_name,
    last_name,
    password,
    role
) VALUES (
 '123 Main Street',
 '11144477735',
 'admin@mail.com',
 'admin',
 'user',
 '$2a$10$cMQK3JjnUnOXZMFRkP7XreDiEKucQLg2nGQDvhn193Y26NPjkOuwO',
 'ROLE_ADMIN'
);

INSERT IGNORE INTO products (
    product_name,
    selling_price,
    price_at_purchase,
    stock_quantity
) VALUES
      ('Vaio Laptop', 1050, 700, 10),
      ('Dell Inspiron 15', 1200, 850, 8),
      ('Lenovo ThinkPad E14', 1350, 950, 12),
      ('HP Pavilion 14', 1100, 780, 15),
      ('Acer Aspire 5', 980, 650, 20);