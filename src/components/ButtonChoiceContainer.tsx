import { BsChevronDown } from 'react-icons/bs';

interface IShowCategories {
  showCategories: boolean;
  setShowCategories: (value: boolean) => void;
}

const ButtonChoiceContainer = ({
  setShowCategories,
  showCategories,
}: IShowCategories): JSX.Element => {
  return (
    <button onClick={() => setShowCategories(!showCategories)}>
      Choose recipe by Category:
      <BsChevronDown />
    </button>
  );
};

export default ButtonChoiceContainer;
