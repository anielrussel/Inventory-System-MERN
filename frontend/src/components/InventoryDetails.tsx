import React, { useState } from "react";
import useInventoryContext from "../hooks/useInventoryContext";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Modal } from "antd";
import useAuthContext from "../hooks/useAuthContext";
import noinventory from "../assets/noinventory.jpg";

interface InventoryItem {
  _id: React.Key;
  name: string;
  quantity: number;
  price: number;
  isAvailable: string;
}

interface InventoryDetailsProps {
  inventory: InventoryItem[];
}

const InventoryDetails: React.FC<InventoryDetailsProps> = ({ inventory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  const [sortOption, setSortOption] = useState("all");
  const [updateItem, setUpdateItem] = useState<InventoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  const { dispatch } = useInventoryContext();
  const { user } = useAuthContext();

  // ant modal for delete
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle Update
  const handleUpdate = (inventoryItem: InventoryItem) => {
    setUpdateItem(inventoryItem);
  };
  const handleUpdateSubmit = async (updatedItem: InventoryItem) => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.put(
        `/api/inventory/${updatedItem._id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "UPDATE_INVENTORY", payload: updatedItem });
        setUpdateItem(null);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // handle Delete
  const handleDelete = async (inventoryItem: InventoryItem) => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(
        `/api/inventory/${inventoryItem._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "DELETE_INVENTORY", payload: response.data });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    if (itemToDelete) {
      // check if itemToDelete is not null
      await handleDelete(itemToDelete);
    }
  };

  // sort inventory
  const sortInventory = (inventory: InventoryItem[], option: String) => {
    switch (option) {
      case "name":
        return inventory.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
      case "quantity":
        return inventory.sort((a, b) => a.quantity - b.quantity);
      case "price":
        return inventory.sort((a, b) => a.price - b.price);
      case "total":
        return inventory.sort(
          (a, b) => a.quantity * a.price - b.quantity * b.price
        );
      default:
        return inventory;
    }
  };

  // search inventory
  const filteredInventory = sortInventory(
    inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!showAvailable || item.isAvailable === "available") &&
        (!showNotAvailable || item.isAvailable === "not available")
    ),
    sortOption
  );

  if (inventory.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20 gap-6">
        <h1 className="font-Rubik font-semibold text-xl">No Inventory created yet...</h1>
        <img src={noinventory} alt="noinventory" className="w-[20%]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col lg:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md py-2 pl-2 outline-none lg:w-[300px]"
          />
          <select
            name="sort"
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-400 rounded-md py-1 outline-none lg:px-3"
          >
            <option value="all">Sort Inventory:</option>
            <option value="name">Sort by name</option>
            <option value="quantity">Sort by quantity</option>
            <option value="price">Sort by price</option>
            <option value="total">Sort by total price</option>
          </select>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-2">
          <label className="font-Rubik">
            <input
              type="checkbox"
              checked={showNotAvailable}
              onChange={(e) => {
                setShowNotAvailable(e.target.checked);
                if (e.target.checked) {
                  setShowAvailable(false);
                }
              }}
              className="ouline-none cursor-pointer w-5"
            />
            Not Available
          </label>
          <label className="font-Rubik">
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={(e) => {
                setShowAvailable(e.target.checked);
                if (e.target.checked) {
                  setShowNotAvailable(false);
                }
              }}
              className="ouline-none cursor-pointer w-5"
            />
            Available
          </label>
        </div>
      </div>
      <table className="border-collapse border border-black mt-2 w-full shadow-lg font-Rubik">
        <thead className="bg-gray-300">
          <tr>
            <th className="border-2 border-black px-1 lg:px-4 py-4">Name</th>
            <th className="border-2 border-black px-1 lg:px-4 py-4">
              Quantity
            </th>
            <th className="border-2 border-black px-1 lg:px-4 py-4">Price</th>
            <th className="border-2 border-black px-1 lg:px-4 py-4">
              Total Price
            </th>
            <th className="border-2 border-black px-1 lg:px-4 py-4">Status</th>
            <th className="border-2 border-black px-1 lg:px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((inventoryItem) => (
            <tr key={inventoryItem._id}>
              <td className="border border-black px-1 lg:px-4">
                {inventoryItem.name}
              </td>
              <td className="border border-black px-1 lg:px-4">
                {inventoryItem.quantity}
              </td>
              <td className="border border-black px-1 lg:px-4">
                ₱{inventoryItem.price.toLocaleString()}
              </td>
              <td className="border border-black px-1 lg:px-4">
                ₱
                {(
                  inventoryItem.price * inventoryItem.quantity
                ).toLocaleString()}
              </td>
              <td className="border border-black px-1 lg:px-4">
                {inventoryItem.isAvailable}
              </td>
              <td className="border border-black px-1">
                <button
                  className="p-2 bg-white rounded-md cursor-pointer"
                  onClick={() => {
                    setItemToDelete(inventoryItem);
                    showModal();
                  }}
                >
                  <RiDeleteBin6Fill color={"red"} />
                </button>
                <Modal
                  title="Confirm Deletion"
                  open={isModalOpen}
                  maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  onOk={handleOk}
                  okButtonProps={{
                    style: { backgroundColor: "#f50", borderColor: "#f50" },
                  }}
                  onCancel={handleCancel}
                >
                  <h1>Are you sure you want to delete?</h1>
                </Modal>
                <button
                  className="lg:ml-4 p-2 bg-white rounded-md cursor-pointer"
                  onClick={() => handleUpdate(inventoryItem)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---UPDATE INVENTORY--- */}
      {updateItem && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-4 lg:flex-row lg:gap-0 w-[80%] lg:w-auto">
            <label>
              Name:
              <input
                type="text"
                value={updateItem.name}
                onChange={(e) =>
                  setUpdateItem({ ...updateItem, name: e.target.value })
                }
                className="ml-2 pl-2 rounded-md border border-black"
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={updateItem.quantity}
                onChange={(e) =>
                  setUpdateItem({
                    ...updateItem,
                    quantity: parseInt(e.target.value),
                  })
                }
                className="ml-2 pl-2 rounded-md border border-black w-[50%]"
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={updateItem.price}
                onChange={(e) =>
                  setUpdateItem({
                    ...updateItem,
                    price: parseInt(e.target.value),
                  })
                }
                className="ml-2 pl-2 rounded-md border border-black w-[50%]"
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                id="status"
                value={updateItem.isAvailable}
                onChange={(e) =>
                  setUpdateItem({ ...updateItem, isAvailable: e.target.value })
                }
                className="ml-2 border border-gray-400 rounded-md py-1 outline-none lg:px-3 w-[50%] lg:w-auto"
              >
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </label>
            <button
              onClick={() => handleUpdateSubmit(updateItem)}
              className="ml-4 border border-black py-1 px-2 bg-black text-white hover:bg-blue-500 hover:border-blue-500 rounded-md cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setUpdateItem(null)}
              className="ml-4 border border-black py-1 px-2 bg-black text-white hover:bg-blue-500 hover:border-blue-500 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDetails;
