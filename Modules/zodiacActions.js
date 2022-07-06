const { client } = require("../DB/db");
const { getSymbolOfZodiacByLanguage } = require("./symbolActions");

const AddZodiac = async (langagueid, zodiac) => {
  const result = await client.query(
    `INSERT INTO public.zodiacdata(
        langague, zodiacid, name, description)
          VALUES ($1,$2,$3,$4)
          returning *;
          `,
    [langagueid, zodiac?.zodiacid, zodiac?.name, zodiac?.description]
  );
  console.log("result", result);
  return result.rows[0];
};

const getZodiacs = async () => {
  const result = await client.query(`SELECT * FROM public.zodiac;`);
  return result.rows;
};

const getZodiacsofLanguage = async (langagueid) => {
  const result = await client.query(
    `SELECT *
    FROM public.zodiac
      INNER JOIN public.zodiacdata ON public.zodiacdata.zodiacid = public.zodiac.name 
      WHERE public.zodiacdata.langague = $1 ;`,
    [langagueid]
  );
  console.log(result.rows);
  return result.rows;
};

const getZodiacofLanguage = async (zodiacid, langagueid) => {
  const result = await client.query(
    `SELECT *
    FROM public.zodiac
      INNER JOIN public.zodiacdata ON public.zodiacdata.zodiacid = public.zodiac.name 
      WHERE public.zodiacdata.langague = $1 and public.zodiacdata.zodiacid = $2 ;`,
    [langagueid, zodiacid]
  );
  console.log(result.rows);
  return result.rows[0];
};

const getZodiacsWithSymbolsOfLanguage = async (langagueid) => {
  const zodiacs = await getZodiacsofLanguage(langagueid);
  const zodiacswithSymbols = await Promise.all(
    zodiacs.map(async (zodiac) => {
      zodiac.symbols = await getSymbolOfZodiacByLanguage(
        zodiac.zodiacid,
        langagueid
      );
      return zodiac;
    })
  );
  console.log(zodiacswithSymbols);
  return zodiacswithSymbols;
};

const getZodiacWithSymbolsOfLanguage = async (langagueid, zodiacid) => {
  const zodiac = await getZodiacofLanguage(zodiacid, langagueid);
  if (!zodiac) return null;
  zodiac.symbols = await getSymbolOfZodiacByLanguage(
    zodiac.zodiacid,
    langagueid
  );
  return zodiac;
};

module.exports = {
  AddZodiac: AddZodiac,
  getZodiacs: getZodiacs,
  getZodiacsofLanguage: getZodiacsofLanguage,
  getZodiacsWithSymbolsOfLanguage: getZodiacsWithSymbolsOfLanguage,
  getZodiacWithSymbolsOfLanguage: getZodiacWithSymbolsOfLanguage,
};
