import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import axios from "../utils/axios";
import { useContext } from "react";
import { BlockContext } from "../utils/blocks-context";
interface InputField {
  id: number;
  value: string;
}

const GenerateBlocks: React.FC = () => {
  const context = useContext(BlockContext);
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState<InputField[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddField = () => {
    const newField: InputField = { id: Date.now(), value: "" };
    setInputFields([...inputFields, newField]);
  };

  const handleRemoveField = (id: number) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  const handleInputChange = (id: number, value: string) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleGenerateBlock = async () => {
    setIsLoading(true);
    const emptyFields = inputFields.filter(
      (field) => field.value.trim() === ""
    );

    if (emptyFields.length > 0) {
      toast.error("Please fill in all input fields.");
    } else {
      const actions = inputFields.map((field) => field.value);

      try {
        const { data } = await axios.post("/bsa/generateBlocks", {
          email: localStorage.getItem("email"),
          action_array: actions,
        });
        context?.setBlocks(data.data);
        toast.success(
          <div
            className="btn btn-primary"
            onClick={() => navigate("/allblocks")}
          >
            Successfully generated blocks, Click here to navigate to All Blocks
          </div>
        );
        setInputFields([]);
        console.log(data);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="container mt-4">
      {inputFields.length === 0 && (
        <h3 className="text-center text-muted my-4">
          Note:- Generate block will enable when you add atlest one action
        </h3>
      )}
      {inputFields.length >= 20 && (
        <h3 className="text-center text-muted">Max actions can only be 20</h3>
      )}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-dark text-white mb-3 fw-bold"
          onClick={handleAddField}
          disabled={inputFields.length >= 20}
        >
          Add Action +
        </button>
        <button
          className="btn btn-success  fw-bold mt-3"
          onClick={handleGenerateBlock}
          disabled={inputFields.length === 0}
        >
          {isLoading ? "Generating..." : "Generate Block"}
        </button>
      </div>
      {inputFields.length === 0 && (
        <button
          onClick={() => navigate("/allblocks")}
          className="btn btn-dark fw-bold text-white"
        >
          All Blocks
        </button>
      )}
      <hr />
      <div style={{ height: "70vh" }} className="d-flex flex-wrap flex-column">
        {inputFields.map((field) => (
          <div key={field.id} className="col-md-2 m-3 ">
            <div className="d-flex ">
              <input
                type="text"
                className="form-control"
                style={{ width: "180px" }}
                value={field.value}
                placeholder="Type your action"
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
              <p
                className="mx-2 text-danger"
                onClick={() => handleRemoveField(field.id)}
              >
                <FaTrash style={{ fontSize: "22px", cursor: "pointer" }} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateBlocks;
