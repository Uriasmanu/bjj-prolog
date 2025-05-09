CREATE TYPE dificuldade_enum AS ENUM ('facil', 'media', 'dificil');

CREATE TYPE tecnica_enum AS ENUM ('guarda', 'raspagem', 'finalizacao', 'drill', 'fisico');


CREATE TABLE aulas(
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    tecnica tecnica_enum NOT NULL,
    dificuldade dificuldade_enum NOT NULL
)