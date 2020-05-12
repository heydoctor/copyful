import { getInterpolatedCopy } from "../Copyful/helpers";

describe("getInterpolatedCopy", () => {
  const copy = {
    title: "The Title is {title}",
    sub: "The Subtitle is {sub}",
  };
  const interpolationValues = {
    title: "Copyful",
    sub: "Awesome",
  };

  it("returns interpolated strings when interpolation values are provided", () => {
    const interpolatedCopy = getInterpolatedCopy(copy, interpolationValues);
    const title = copy.title.replace("{title}", interpolationValues.title);
    const sub = copy.sub.replace("{sub}", interpolationValues.sub);
    expect(interpolatedCopy.title).toEqual(title);
    expect(interpolatedCopy.sub).toEqual(sub);
  });

  it("returns interpolated strings and original strings when interpolation values are partially provided", () => {
    const interpolatedCopy = getInterpolatedCopy(copy, {title: interpolationValues.title});
    const title = copy.title.replace("{title}", interpolationValues.title);
    expect(interpolatedCopy.title).toEqual(title);
    expect(interpolatedCopy.sub).toEqual(copy.sub);
  });

  it("returns the original strings when interpolation values are not provided", () => {
    const interpolatedCopy = getInterpolatedCopy(copy, {});
    expect(interpolatedCopy.title).toEqual(copy.title);
    expect(interpolatedCopy.sub).toEqual(copy.sub);
  });
});
