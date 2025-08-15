import { SpecialistSearchProvider } from "./specialist-search-provider";
import SpecialistList from "./specialist-list";

const Specialists = () => {
  return (
    <SpecialistSearchProvider>
      <SpecialistList />
    </SpecialistSearchProvider>
  );
};

export default Specialists;
