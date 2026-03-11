import { Neighborhood } from "@/types/enums";

/**
 * Maps Berlin neighborhoods (Ortsteile) to their parent districts (Bezirke)
 * This allows filtering properties by district even when the API returns neighborhood names
 */
export const NEIGHBORHOOD_TO_DISTRICT: Record<string, Neighborhood> = {
  // Mitte district
  "mitte": Neighborhood.MITTE,
  "tiergarten": Neighborhood.MITTE,
  "wedding": Neighborhood.MITTE,
  "hansaviertel": Neighborhood.MITTE,
  "moabit": Neighborhood.MITTE,
  "gesundbrunnen": Neighborhood.MITTE,

  // Friedrichshain-Kreuzberg district
  "friedrichshain": Neighborhood.FRIEDRICHSHAIN_KREUZBERG,
  "kreuzberg": Neighborhood.FRIEDRICHSHAIN_KREUZBERG,

  // Pankow district
  "pankow": Neighborhood.PANKOW,
  "prenzlauer berg": Neighborhood.PANKOW,
  "weißensee": Neighborhood.PANKOW,
  "weissensee": Neighborhood.PANKOW,
  "heinersdorf": Neighborhood.PANKOW,
  "blankenburg": Neighborhood.PANKOW,
  "karow": Neighborhood.PANKOW,
  "buch": Neighborhood.PANKOW,
  "französisch buchholz": Neighborhood.PANKOW,
  "niederschönhausen": Neighborhood.PANKOW,
  "rosenthal": Neighborhood.PANKOW,
  "wilhelmsruh": Neighborhood.PANKOW,

  // Charlottenburg-Wilmersdorf district
  "charlottenburg": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "wilmersdorf": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "westend": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "grunewald": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "halensee": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "schmargendorf": Neighborhood.CHARLOTTENBURG_WILMERSDORF,
  "charlottenburg-nord": Neighborhood.CHARLOTTENBURG_WILMERSDORF,

  // Spandau district
  "spandau": Neighborhood.SPANDAU,
  "haselhorst": Neighborhood.SPANDAU,
  "siemensstadt": Neighborhood.SPANDAU,
  "staaken": Neighborhood.SPANDAU,
  "kladow": Neighborhood.SPANDAU,
  "gatow": Neighborhood.SPANDAU,
  "wilhelmstadt": Neighborhood.SPANDAU,
  "falkenhagener feld": Neighborhood.SPANDAU,

  // Steglitz-Zehlendorf district
  "steglitz": Neighborhood.STEGLITZ_ZEHLENDORF,
  "zehlendorf": Neighborhood.STEGLITZ_ZEHLENDORF,
  "dahlem": Neighborhood.STEGLITZ_ZEHLENDORF,
  "lankwitz": Neighborhood.STEGLITZ_ZEHLENDORF,
  "lichterfelde": Neighborhood.STEGLITZ_ZEHLENDORF,
  "nikolassee": Neighborhood.STEGLITZ_ZEHLENDORF,
  "wannsee": Neighborhood.STEGLITZ_ZEHLENDORF,

  // Tempelhof-Schöneberg district
  "tempelhof": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "schöneberg": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "schoeneberg": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "mariendorf": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "marienfelde": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "lichtenrade": Neighborhood.TEMPELHOF_SCHOENEBERG,
  "friedenau": Neighborhood.TEMPELHOF_SCHOENEBERG,

  // Neukölln district
  "neukölln": Neighborhood.NEUKOELLN,
  "neukoelln": Neighborhood.NEUKOELLN,
  "neukolln": Neighborhood.NEUKOELLN,
  "britz": Neighborhood.NEUKOELLN,
  "buckow": Neighborhood.NEUKOELLN,
  "rudow": Neighborhood.NEUKOELLN,
  "gropiusstadt": Neighborhood.NEUKOELLN,

  // Treptow-Köpenick district
  "treptow": Neighborhood.TREPTOW_KOEPENICK,
  "köpenick": Neighborhood.TREPTOW_KOEPENICK,
  "koepenick": Neighborhood.TREPTOW_KOEPENICK,
  "kopenick": Neighborhood.TREPTOW_KOEPENICK,
  "alt-treptow": Neighborhood.TREPTOW_KOEPENICK,
  "johannisthal": Neighborhood.TREPTOW_KOEPENICK,
  "oberschöneweide": Neighborhood.TREPTOW_KOEPENICK,
  "niederschöneweide": Neighborhood.TREPTOW_KOEPENICK,
  "adlershof": Neighborhood.TREPTOW_KOEPENICK,
  "baumschulenweg": Neighborhood.TREPTOW_KOEPENICK,
  "plänterwald": Neighborhood.TREPTOW_KOEPENICK,
  "friedrichshagen": Neighborhood.TREPTOW_KOEPENICK,
  "rahnsdorf": Neighborhood.TREPTOW_KOEPENICK,
  "grünau": Neighborhood.TREPTOW_KOEPENICK,

  // Marzahn-Hellersdorf district
  "marzahn": Neighborhood.MARZAHN_HELLERSDORF,
  "hellersdorf": Neighborhood.MARZAHN_HELLERSDORF,
  "biesdorf": Neighborhood.MARZAHN_HELLERSDORF,
  "kaulsdorf": Neighborhood.MARZAHN_HELLERSDORF,
  "mahlsdorf": Neighborhood.MARZAHN_HELLERSDORF,

  // Lichtenberg district
  "lichtenberg": Neighborhood.LICHTENBERG,
  "hohenschönhausen": Neighborhood.LICHTENBERG,
  "hohenschoenhausen": Neighborhood.LICHTENBERG,
  "friedrichsfelde": Neighborhood.LICHTENBERG,
  "karlshorst": Neighborhood.LICHTENBERG,
  "rummelsburg": Neighborhood.LICHTENBERG,
  "fennpfuhl": Neighborhood.LICHTENBERG,
  "falkenberg": Neighborhood.LICHTENBERG,
  "malchow": Neighborhood.LICHTENBERG,
  "wartenberg": Neighborhood.LICHTENBERG,

  // Reinickendorf district
  "reinickendorf": Neighborhood.REINICKENDORF,
  "tegel": Neighborhood.REINICKENDORF,
  "wittenau": Neighborhood.REINICKENDORF,
  "heiligensee": Neighborhood.REINICKENDORF,
  "frohnau": Neighborhood.REINICKENDORF,
  "hermsdorf": Neighborhood.REINICKENDORF,
  "waidmannslust": Neighborhood.REINICKENDORF,
  "lübars": Neighborhood.REINICKENDORF,
  "märkisches viertel": Neighborhood.REINICKENDORF,
};

/**
 * Gets the district for a given neighborhood name
 * Returns undefined if the neighborhood is not in the mapping
 */
export const getDistrictForNeighborhood = (neighborhood: string): Neighborhood | undefined => {
  const normalized = neighborhood.toLowerCase().trim();
  return NEIGHBORHOOD_TO_DISTRICT[normalized];
};
