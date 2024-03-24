import SpotForm from "../SpotForm/SpotForm";

function CreateSpot() {
  const spot = {
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    description: "",
    name: "",
    price: "",
  };

  return <SpotForm spot={spot} formType={"Create"} />;
}

export default CreateSpot;
