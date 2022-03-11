import { BlockElement, BlockSelectorInput } from './styled';
import React from 'react';
import useBlockStore, { BlockType } from '../../../store/blocks';

type BlockProps = {
  blockId: string;
  block: BlockType;
  isEmpty: boolean;
  isBlock: boolean;
};

const Block: React.FC<BlockProps> = (props) => {
  const [isSelected, setIsSelected] = React.useState(0);
  const addBlock = useBlockStore((store) => store.addBlock);
  const deleteBlock = useBlockStore((store) => store.deleteBlock);

  const handleBlockSelect = () => {
    if (!isSelected) {
      setIsSelected(1);
      addBlock(props.blockId, props.block);
    } else {
      setIsSelected(0);
      deleteBlock(props.blockId);
    }
  };

  return (
    <BlockElement contentEditable={false} id={props.blockId}>
      <BlockSelectorInput
        type="checkbox"
        value={isSelected}
        onClick={handleBlockSelect}
      />
      {props.children}
    </BlockElement>
  );
};

export default Block;
