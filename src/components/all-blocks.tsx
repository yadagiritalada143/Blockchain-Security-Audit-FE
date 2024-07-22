import React, { useEffect } from "react";
import { Table, OverlayTrigger, Popover } from "react-bootstrap";
import Navbar from "./navbar";
import { toast } from "react-toastify";
import { useContext } from "react";
import { BlockContext } from "../utils/blocks-context";
import axios from "../utils/axios";

const AllBlocksPage: React.FC = () => {
  const context = useContext(BlockContext);

  const getBlocks = async () => {
    try {
      const { data } = await axios(
        `/bsa/getBlocksByUser/${localStorage.getItem("email")}`
      );
      context?.setBlocks(data.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (context?.blocks.length === 0) {
      getBlocks();
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/bsa/deleteBlockById", { data: { id: id } });
      const blocks = context?.blocks;
      if (blocks) {
        const updatedBlocks = blocks.filter((b) => b._id !== id);
        context.setBlocks(updatedBlocks);
      }
      toast.success("Deleted Block Successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }} className="background">
        <h2 className="text-center pt-4">
          All Blocks({context?.blocks?.length})
        </h2>
        <Table className="container" striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-primary">Action</th>
              <th className="text-secondary">Reference ID</th>
              <th className="text-success">Preceding Hash</th>
              <th className="text-danger">Hash</th>
              <th className="text-warning">Iterations</th>
              <th className="text-info">User Agent</th>
              <th className="text-muted">IP</th>
              <th className="text-dark">Created At</th>
              <th className="text-danger">Action</th>
            </tr>
          </thead>
          <tbody>
            {context?.blocks?.map((block, index) => (
              <tr key={index}>
                <td>{block.data?.action || "---Genisis Block--- "}</td>
                <td>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Popover className="bg-dark">
                        <Popover.Body className="text-white">
                          {block.data?.ref_id?.slice(0, 15)}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(block.data?.ref_id);
                        toast.success("Copied successfully");
                      }}
                    >
                      {block.data?.ref_id || "--Genisis Block---"}
                    </span>
                  </OverlayTrigger>
                </td>
                {index === 0 ? (
                  <td>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={
                        <Popover className="bg-dark">
                          <Popover.Body className="text-white">
                            Genesis block is the first block in the blockchain
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <span>---Genesis-Block---</span>
                    </OverlayTrigger>
                  </td>
                ) : (
                  <td>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={
                        <Popover className="bg-dark">
                          <Popover.Body className="text-white">
                            {block.preceding_hash}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(block.preceding_hash);
                          toast.success("Copied successfully");
                        }}
                      >
                        {block.preceding_hash?.substring(0, 15)}...
                      </span>
                    </OverlayTrigger>
                  </td>
                )}
                <td>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Popover className="bg-dark">
                        <Popover.Body className="text-white">
                          {block.hash}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(block.hash);
                        toast.success("Copied successfully");
                      }}
                    >
                      {block.hash?.substring(0, 15)}...
                    </span>
                  </OverlayTrigger>
                </td>
                <td>{block.iterations}</td>
                <td>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="top"
                    overlay={
                      <Popover className="bg-dark">
                        <Popover.Body className="text-white">
                          {block.data?.user_agent || "---Genisis Block--- "}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(block.data.user_agent);
                        toast.success("Copied successfully");
                      }}
                    >
                      {block.data?.user_agent?.substring(0, 15) ||
                        "Genisi Block"}
                      ...
                    </span>
                  </OverlayTrigger>
                </td>
                <td>{block.data?.ip || "Genisis Block"}</td>
                <td>{new Date(block.created_on).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(block._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AllBlocksPage;
