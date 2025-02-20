// utils.ts
// Martin Pravda

// Simple utility functions

// Returns a partial copy of an object containing only the keys specified
// It is also possible to format the given values if formatter function is provided
export const pick = <T>(
  object: Record<string, T>,
  properties: string[] | [string, <T, K>(val: T) => K][]
) => {
  return properties.reduce(
    function (o, property) {
      if (Array.isArray(property)) {
        const [prop, formatter] = property;
        o[prop] = formatter(object[prop]);
        return o;
      }

      o[property] = object[property];
      return o;
    },
    {} as Record<string, T>
  );
};

// Format timestamp into the format dd.mm.yyyy hh:mm:ss
export const format_timestamp = (timestamp: string) => {
  const [date, time] = timestamp.split("T");
  const european_date_format = date.split("-").reverse().join(".");
  return `${european_date_format} ${time.slice(0, -1)}`;
};
