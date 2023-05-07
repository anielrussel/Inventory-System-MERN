import React, { useEffect } from "react";
import InventoryForm from "../components/InventoryForm";
import useInventoryContext from "../hooks/useInventoryContext";
import axios from "axios";
import InventoryDetails from "../components/InventoryDetails";

const Home: React.FC = () => {
  const { inventory, dispatch } = useInventoryContext();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/inventory");
        if (response.status === 200) {
          dispatch({ type: "SET_INVENTORY", payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [dispatch]);

  return (
    <div className="px-4 lg:px-32 mt-32">
      <div>
        <InventoryForm />
      </div>
      {inventory && (
        <InventoryDetails inventory={inventory} />
      )}
    </div>
  );
};

export default Home;
