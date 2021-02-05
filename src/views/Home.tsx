import { useState } from 'react';
import ButtonChoiceContainer from '../components/ButtonChoiceContainer';
import Categories from '../components/Categories';

const Home = (): JSX.Element => {
  const [showCategories, setShowCategories] = useState<boolean>(false);

  return (
    <main className="main">
      <ButtonChoiceContainer
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      {showCategories && <Categories />}
    </main>
  );
};

export default Home;
