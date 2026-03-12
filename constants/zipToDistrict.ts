import { Neighborhood } from "@/types/enums";

/**
 * Maps Berlin zip codes to their districts (Bezirke)
 * Berlin zip codes range from 10115 to 14199
 */
export const getDistrictFromZipCode = (zipCode: string | null | undefined): Neighborhood | undefined => {
  if (!zipCode) return undefined;

  const zip = zipCode.trim();
  const zipNum = parseInt(zip, 10);

  if (isNaN(zipNum)) return undefined;

  // Mitte: 10115-10179, 10315 (part), 10405-10439, 13347-13359 (Wedding)
  if (
    (zipNum >= 10115 && zipNum <= 10179) ||
    (zipNum >= 10405 && zipNum <= 10439) ||
    (zipNum >= 13347 && zipNum <= 13359) ||
    zipNum === 10557 || zipNum === 10551 || zipNum === 10553 || zipNum === 10555 || // Moabit/Tiergarten
    zipNum === 10559 || zipNum === 10785 || zipNum === 10787
  ) {
    return Neighborhood.MITTE;
  }

  // Friedrichshain-Kreuzberg: 10243-10249, 10961-10999, 10178 (part)
  if (
    (zipNum >= 10243 && zipNum <= 10249) ||
    (zipNum >= 10961 && zipNum <= 10999) ||
    (zipNum >= 10315 && zipNum <= 10319)
  ) {
    return Neighborhood.FRIEDRICHSHAIN_KREUZBERG;
  }

  // Pankow: 10405-10439 (Prenzlauer Berg), 13086-13189
  if (
    (zipNum >= 13086 && zipNum <= 13089) ||
    (zipNum >= 13125 && zipNum <= 13129) ||
    (zipNum >= 13156 && zipNum <= 13159) ||
    (zipNum >= 13187 && zipNum <= 13189) ||
    zipNum === 10407 || zipNum === 10409 || // Prenzlauer Berg
    zipNum === 10435 || zipNum === 10437 || zipNum === 10439 ||
    zipNum === 10247 // Part of Friedrichshain but close to Prenzlauer Berg
  ) {
    return Neighborhood.PANKOW;
  }

  // Charlottenburg-Wilmersdorf: 10585-10629, 10707-10789, 14050-14059, 14193-14199
  if (
    (zipNum >= 10585 && zipNum <= 10629) ||
    (zipNum >= 10707 && zipNum <= 10719) ||
    (zipNum >= 10789 && zipNum <= 10825) ||
    (zipNum >= 14050 && zipNum <= 14059) ||
    (zipNum >= 14193 && zipNum <= 14199) ||
    zipNum === 13627 // Charlottenburg-Nord
  ) {
    return Neighborhood.CHARLOTTENBURG_WILMERSDORF;
  }

  // Spandau: 13581-13599, 14089
  if (
    (zipNum >= 13581 && zipNum <= 13599) ||
    (zipNum >= 13629 && zipNum <= 13629) ||
    zipNum === 14089
  ) {
    return Neighborhood.SPANDAU;
  }

  // Steglitz-Zehlendorf: 12157-12209, 14109-14169
  if (
    (zipNum >= 12157 && zipNum <= 12209) ||
    (zipNum >= 14109 && zipNum <= 14169) ||
    zipNum === 12163 || zipNum === 12165 || zipNum === 12167 || zipNum === 12169
  ) {
    return Neighborhood.STEGLITZ_ZEHLENDORF;
  }

  // Tempelhof-Schöneberg: 10777-10829, 10965, 12099-12109, 12157-12159, 12247-12279
  if (
    (zipNum >= 10777 && zipNum <= 10783) ||
    (zipNum >= 10823 && zipNum <= 10829) ||
    (zipNum >= 12099 && zipNum <= 12109) ||
    (zipNum >= 12247 && zipNum <= 12279) ||
    (zipNum >= 10825 && zipNum <= 10829) ||
    zipNum === 10965 || zipNum === 12101 || zipNum === 12103 || zipNum === 12105 || zipNum === 12107 || zipNum === 12109
  ) {
    return Neighborhood.TEMPELHOF_SCHOENEBERG;
  }

  // Neukölln: 12043-12059, 12347-12359, 12435, 12437, 12439
  if (
    (zipNum >= 12043 && zipNum <= 12059) ||
    (zipNum >= 12347 && zipNum <= 12359) ||
    zipNum === 12435 || zipNum === 12437 || zipNum === 12439 ||
    zipNum === 12045 || zipNum === 12047 || zipNum === 12049 || zipNum === 12051 || zipNum === 12053 || zipNum === 12055 || zipNum === 12057 || zipNum === 12059
  ) {
    return Neighborhood.NEUKOELLN;
  }

  // Treptow-Köpenick: 12435-12559
  if (
    (zipNum >= 12435 && zipNum <= 12439) ||
    (zipNum >= 12459 && zipNum <= 12559) ||
    zipNum === 12487 || zipNum === 12489 || zipNum === 12524 || zipNum === 12526 || zipNum === 12527 || zipNum === 12555 || zipNum === 12557 || zipNum === 12559
  ) {
    return Neighborhood.TREPTOW_KOEPENICK;
  }

  // Marzahn-Hellersdorf: 12619-12689
  if (zipNum >= 12619 && zipNum <= 12689) {
    return Neighborhood.MARZAHN_HELLERSDORF;
  }

  // Lichtenberg: 10315-10319, 10365-10369, 13051-13059
  if (
    (zipNum >= 10315 && zipNum <= 10319) ||
    (zipNum >= 10365 && zipNum <= 10369) ||
    (zipNum >= 13051 && zipNum <= 13059) ||
    zipNum === 10367
  ) {
    return Neighborhood.LICHTENBERG;
  }

  // Reinickendorf: 13403-13509
  if (
    (zipNum >= 13403 && zipNum <= 13509) ||
    zipNum === 13405 || zipNum === 13407 || zipNum === 13409 || zipNum === 13435 || zipNum === 13437 || zipNum === 13439 ||
    zipNum === 13465 || zipNum === 13467 || zipNum === 13469 || zipNum === 13503 || zipNum === 13505 || zipNum === 13507 || zipNum === 13509
  ) {
    return Neighborhood.REINICKENDORF;
  }

  return undefined;
};
