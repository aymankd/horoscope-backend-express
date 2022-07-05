const { client } = require("../DB/db");
const { NotFoundException } = require("../Errors");
const addLanguage = async (language) => {
  const result = await client.query(
    `INSERT INTO public.language(
      id, name)
            VALUES ($1,$2)
            returning *;
            `,
    [language?.id, language?.name]
  );
  return result.rows[0];
};

const updateLanguage = async (id, language) => {
  const result = await client.query(
    `UPDATE public.language
            SET name = $1
            WHERE id = $2
            returning *;
            `,
    [language?.name, id]
  );
  return result.rows[0];
};

const getLanguages = async () => {
  const result = await client.query(
    `SELECT id, name
      FROM public.language;
              `
  );
  return result.rows;
};

const getLanguage = async (id) => {
  const result = await client.query(
    `SELECT id, name
	FROM public.language where id = $1;
              `,
    [id]
  );
  if (result.rows.length === 0)
    throw new NotFoundException("Language not found");
  return result.rows[0];
};

module.exports = {
  addLanguage: addLanguage,
  getLanguage: getLanguage,
  getLanguages: getLanguages,
  updateLanguage: updateLanguage,
};
