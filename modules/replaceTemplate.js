module.exports = (template, plane) => {
  let output = template.replace(/{%PLANENAME%}/g, plane.name);
  output = output.replace(/{%PLANECOUNTRY%}/g, plane.country);
  output = output.replace(/{%PLANEFLIGHT%}/g, plane.flight);
  output = output.replace(/{%ID%}/g, plane.id);
  const transit = plane.description.slice(0, 200).split(" ");
  transit.pop();
  const transitBis = `${transit.join(" ")}...`;
  output = output.replace(/{%PLANEDESCRIPTION%}/g, transitBis);
  return output;
};
