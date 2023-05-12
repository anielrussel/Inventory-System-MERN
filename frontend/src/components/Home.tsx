import React, { useEffect, useState } from "react";
import InventoryForm from "./InventoryForm";
import useInventoryContext from "../hooks/useInventoryContext";
import axios from "axios";
import InventoryDetails from "./InventoryDetails";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useAuthContext from "../hooks/useAuthContext";
import Login from "./Login";

const Home: React.FC = () => {
  const { inventory, dispatch } = useInventoryContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("https://inventory-sytem-mern.onrender.com/api/inventory", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "SET_INVENTORY", payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchInventory();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-center"><h1 className="font-Rubik text-3xl font-bold">Loading...</h1></div>;
  }

  return (
    <div>
      {inventory
        ? (
          <>
            <Navbar />
            <div className="px-4 lg:px-32 mt-32">
              <div>
                <InventoryForm />
              </div>
              <InventoryDetails inventory={inventory} />
            </div>
            <Footer />
          </>
        )
        : 
        <Login />
      }
    </div>

  );
};

export default Home;
