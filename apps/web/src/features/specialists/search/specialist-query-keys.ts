import { SpecialistSearchForm } from "./specialist-search-schema";

export const queryKeys = {
  specialistSearch: (params: SpecialistSearchForm) =>
    ["specialists", buildSearchParamTags(params)] as const,
};

function buildSearchParamTags(params: SpecialistSearchForm) {
  const { query, genderIds, provinceId, sortOption, pageSize } = params;

  return {
    // exclude page; it is handled by TanStack’s pageParam
    ...(query ? { query } : {}),
    ...(genderIds?.length
      ? { genderIds: genderIds.map((g) => g.value).join("_") }
      : {}),
    ...(provinceId ? { provinceId } : {}),
    ...(sortOption ? { sortOption } : {}),
    ...(pageSize ? { pageSize } : {}),
  };
}
