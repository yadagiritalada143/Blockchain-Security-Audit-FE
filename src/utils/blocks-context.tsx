import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Block {
  data: {
    action: string;
    ref_id: string;
    ip: string;
    user_agent: string;
  };
  preceding_hash: string;
  hash: string;
  iterations: string;
  created_on: string;
}

type BlockContextType = {
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
};

const BlockContext = createContext<BlockContextType | undefined>(undefined);

type BlockProviderProps = {
  children: ReactNode;
};

const BlockProvider = ({ children }: BlockProviderProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};

export { BlockProvider, BlockContext };
