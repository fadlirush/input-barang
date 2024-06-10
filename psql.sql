CREATE TABLE barang (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100),
    harga INTEGER,
    stok INTEGER
);
ALTER TABLE barang ADD status CHAR(1);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    kategori VARCHAR(100),
);