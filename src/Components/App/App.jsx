import NavBar from "../NavBar/NavBar";
import { useCustomLocationState } from "../../helpers";

const App = () => {
  const [items, setItems] = useCustomLocationState();

  return (
    <>
      <NavBar items={items} />
    </>
  );
};

export default App;
