import React from "react";
import { Table, OverlayTrigger, Popover } from "react-bootstrap";
import Navbar from "./navbar";
import { toast } from "react-toastify";

interface BlockData {
  action: string;
  referenceId: string;
  precedingHash: string;
  hash: string;
  iterations: number;
  userAgent: string;
  ip: string;
  createdAt: string;
}

const blockData: BlockData[] = [
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  {
    action: "Action 1",
    referenceId: "ref1234567890",
    precedingHash: "prevhash1234567890abcdefgh",
    hash: "hash1234567890abcdefgh",
    iterations: 5,
    userAgent: "Mozilla/5.0",
    ip: "192.168.0.1",
    createdAt: "2024-07-22T12:34:56Z",
  },
  // Add more block data as needed
];

const AllBlocksPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }} className="background">
        <h2 className="text-center pt-4">All Blocks({blockData.length})</h2>
        <Table striped bordered hover responsive>
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
            {blockData.map((block, index) => (
              <tr key={index}>
                <td>{block.action}</td>
                <td>
                  <OverlayTrigger
                    trigger="hover"
                    placement="top"
                    overlay={
                      <Popover className="bg-dark">
                        <Popover.Body className="text-white">
                          {block.referenceId.slice(0, 15)}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(block.referenceId);
                        toast.success("Copied successfully");
                      }}
                    >
                      {block.referenceId}
                    </span>
                  </OverlayTrigger>
                </td>
                {index === 0 ? (
                  <td>
                    <OverlayTrigger
                      trigger="hover"
                      placement="top"
                      overlay={
                        <Popover className="bg-dark">
                          <Popover.Body className="text-white">
                            Gensis block is the first block in the blockchain
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <span>---Genisis-Block--- </span>
                    </OverlayTrigger>
                  </td>
                ) : (
                  <td>
                    <OverlayTrigger
                      trigger="hover"
                      placement="top"
                      overlay={
                        <Popover className="bg-dark">
                          <Popover.Body className="text-white">
                            {block.precedingHash}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(block.precedingHash);
                          toast.success("Copied successfully");
                        }}
                      >
                        {block.precedingHash.substring(0, 15)}...
                      </span>
                    </OverlayTrigger>
                  </td>
                )}
                <td>
                  <OverlayTrigger
                    trigger="hover"
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
                      {block.hash.substring(0, 15)}...
                    </span>
                  </OverlayTrigger>
                </td>
                <td>{block.iterations}</td>
                <td>
                  <OverlayTrigger
                    trigger="hover"
                    placement="top"
                    overlay={
                      <Popover className="bg-dark">
                        <Popover.Body className="text-white">
                          {block.userAgent}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(block.userAgent);
                        toast.success("Copied successfully");
                      }}
                    >
                      {block.userAgent.substring(0, 15)}...
                    </span>
                  </OverlayTrigger>
                </td>
                <td>{block.ip}</td>
                <td>{new Date(block.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
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
