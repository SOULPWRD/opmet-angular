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

// Formats the timestamp into the given format dd.mm.yyyy hh:mm:ss
export function formatTimestamp(timestamp: string) {
  const dateObject = new Date(timestamp);
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();
  const dateArr = date.split("/");
  const slovakDateFormat = `${dateArr[1]}.${dateArr[0]}.${dateArr[2]}`;
  return `${slovakDateFormat} ${time.split(" ").slice(0, -1)}`;
}

// create a font color tag with a specified color
export function colorify(value: string, color: string) {
  return `<font color="${color}">${value}</font>`;
}

// make BKN, FEW and SCT text colorized
export function formatText(text: string) {
  const rx = /(BKN|FEW|SCT)(\d+)/g;
  return text.replace(rx, function (string, _, number) {
    if (number < 30) {
      return colorify(string, "blue");
    }
    return colorify(string, "red");
  });
}
