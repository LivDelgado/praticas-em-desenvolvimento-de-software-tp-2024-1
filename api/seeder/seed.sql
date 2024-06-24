BEGIN TRANSACTION;

INSERT INTO "veiculo" (
    "montadora",
    "modelo",
    "ano",
    "dataAquisicao"
) VALUES
    ('Hyundai', 'HB20', '2020', '2022-03-17T00:00:00.000Z'),
    ('Toyota', 'Etios', '2021', '2022-03-18T00:00:00.000Z'),
    ('Toyota', 'Corolla', '2021', '2022-03-18T00:00:00.000Z'),
    ('Fiat', 'Punto', '2022', '2022-05-07T00:00:00.000Z'),
    ('Volkswagen', 'Voyage', '2022', '2022-05-08T00:00:00.000Z'),
    ('Volkswagen', 'Gol', '2023', '2024-01-02T00:00:00.000Z'),
    ('Fiat', 'Uno', '2023', '2024-01-02T00:00:00.000Z'),
    ('Honda', 'Civic', '2023', '2024-01-02T00:00:00.000Z');

INSERT INTO "manutencao" ("veiculoId", "dataInicio", "dataFim")
    (SELECT id, now() - interval '1 day', now() + interval '1 day' FROM "veiculo" WHERE "montadora" = 'Toyota' AND "modelo" = 'Corolla' AND "ano" = '2021' LIMIT 1);
INSERT INTO "manutencao" ("veiculoId", "dataInicio", "dataFim")
    (SELECT id, now() - interval '2 day', now() + interval '1 day' FROM "veiculo" WHERE "montadora" = 'Fiat' AND "modelo" = 'Punto' AND "ano" = '2022' LIMIT 1);

COMMIT;
