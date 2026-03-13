/**
 * Maps Berlin zip codes to their districts (Bezirke).
 * Used as a fallback when Propstack's location_name field is empty.
 */
export const getDistrictFromZipCode = (zipCode: string | null | undefined): string | undefined => {
  if (!zipCode) return undefined;
  const zip = parseInt(zipCode.trim(), 10);
  if (isNaN(zip)) return undefined;

  if (
    (zip >= 10115 && zip <= 10179) ||
    (zip >= 10405 && zip <= 10439) ||
    (zip >= 13347 && zip <= 13359) ||
    [10557, 10551, 10553, 10555, 10559, 10785, 10787].includes(zip)
  ) return "Mitte";

  if (
    (zip >= 10243 && zip <= 10249) ||
    (zip >= 10961 && zip <= 10999) ||
    (zip >= 10315 && zip <= 10319)
  ) return "Friedrichshain-Kreuzberg";

  if (
    (zip >= 13086 && zip <= 13089) ||
    (zip >= 13125 && zip <= 13129) ||
    (zip >= 13156 && zip <= 13159) ||
    (zip >= 13187 && zip <= 13189) ||
    [10407, 10409, 10435, 10437, 10439, 10247].includes(zip)
  ) return "Pankow";

  if (
    (zip >= 10585 && zip <= 10629) ||
    (zip >= 10707 && zip <= 10719) ||
    (zip >= 10789 && zip <= 10825) ||
    (zip >= 14050 && zip <= 14059) ||
    (zip >= 14193 && zip <= 14199) ||
    zip === 13627
  ) return "Charlottenburg-Wilmersdorf";

  if (
    (zip >= 13581 && zip <= 13599) ||
    zip === 13629 || zip === 14089
  ) return "Spandau";

  if (
    (zip >= 12157 && zip <= 12209) ||
    (zip >= 14109 && zip <= 14169)
  ) return "Steglitz-Zehlendorf";

  if (
    (zip >= 10777 && zip <= 10783) ||
    (zip >= 10823 && zip <= 10829) ||
    (zip >= 12099 && zip <= 12109) ||
    (zip >= 12247 && zip <= 12279) ||
    zip === 10965
  ) return "Tempelhof-Schöneberg";

  if (
    (zip >= 12043 && zip <= 12059) ||
    (zip >= 12347 && zip <= 12359) ||
    [12435, 12437, 12439].includes(zip)
  ) return "Neukölln";

  if (
    (zip >= 12459 && zip <= 12559) ||
    [12487, 12489, 12524, 12526, 12527].includes(zip)
  ) return "Treptow-Köpenick";

  if (zip >= 12619 && zip <= 12689) return "Marzahn-Hellersdorf";

  if (
    (zip >= 10365 && zip <= 10369) ||
    (zip >= 13051 && zip <= 13059) ||
    zip === 10367
  ) return "Lichtenberg";

  if (zip >= 13403 && zip <= 13509) return "Reinickendorf";

  return undefined;
};
