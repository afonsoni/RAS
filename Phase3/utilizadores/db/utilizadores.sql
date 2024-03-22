BEGIN TRANSACTION;

DROP TABLE IF EXISTS "utilizador";
CREATE TABLE IF NOT EXISTS "utilizador" (
    "id"       TEXT NOT NULL PRIMARY KEY,
    "name"     TEXT NOT NULL,
    "email"    TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type"     INTEGER NOT NULL 
);

-- type 1 → utilizador académico
-- type 2 → utilizador docente
-- type 3 → gestor

DROP TABLE IF EXISTS "uc";
CREATE TABLE "uc" (
    "n"           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    UNIQUE ("n", "description")
);


DROP TABLE IF EXISTS "aluno";
CREATE TABLE "aluno" (
    "id" TEXT ,
    "uc_attends" INTEGER ,

    FOREIGN KEY ("id") REFERENCES "utilizador"("id") ON UPDATE CASCADE
    FOREIGN KEY ("uc_attends") REFERENCES "uc"("n") ON UPDATE CASCADE
    UNIQUE ("id", "uc_attends")
);



DROP TABLE IF EXISTS "docente";
CREATE TABLE "docente" (
    "id" TEXT ,
    "uc_gives" INTEGER ,

    FOREIGN KEY ("id") REFERENCES "utilizador"("id") ON UPDATE CASCADE
    FOREIGN KEY ("uc_gives") REFERENCES "uc"("n") ON UPDATE CASCADE
    UNIQUE ("id", "uc_gives")
);


INSERT INTO "utilizador" VALUES ('a95191','João Alvim','joaoafonsoalvim@gmail.com','12356789',1);
INSERT INTO "utilizador" VALUES ('pg53902','Miguel Alves','miguelalves@gmail.com','passw00rd',1);
INSERT INTO "utilizador" VALUES ('49326','A L S','ALS@gmail.com','lalal',3);

INSERT INTO "aluno"   VALUES ('a95191',1);
INSERT INTO "aluno"   VALUES ('a95191',2);
INSERT INTO "aluno"   VALUES ('pg53902',1);
INSERT INTO "aluno"   VALUES ('pg53902',3);
INSERT INTO "docente" VALUES ('49326',1);

INSERT INTO "uc" VALUES (1,'Desenvolvimento de Aplicações');
INSERT INTO "uc" VALUES (2,'Métodos formais');
INSERT INTO "uc" VALUES (3,'Cálculo de Programas');

COMMIT;
