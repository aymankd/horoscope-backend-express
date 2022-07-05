const { client } = require("../DB/db");

const addSymbol = async (lang, symbol) => {
  const result = await client.query(
    `INSERT INTO public.symbol(
      zodiacid,lang, name, value)
            VALUES ($1,$2,$3,$4)
            returning *;
            `,
    [symbol?.zodiacid, lang, symbol?.name, symbol?.value]
  );
  return result.rows[0];
};

const getSymbolOfZodiacByLanguage = async (zodiacid, langid) => {
  const result = await client.query(
    ` SELECT zodiacid, lang, name, value
      FROM public.symbol
      WHERE public.symbol.zodiacid = $1 AND public.symbol.lang = $2;
            `,
    [zodiacid, langid]
  );
  return result.rows;
};

module.exports = {
  addSymbol: addSymbol,
  getSymbolOfZodiacByLanguage: getSymbolOfZodiacByLanguage,
};
