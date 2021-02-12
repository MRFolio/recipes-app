import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { loadRecipeBySearchInput } from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
import styles from './Search.module.scss';

const Search = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(loadRecipeBySearchInput(query));
  // }, [query, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('tereForm');
    if (query) {
      dispatch(loadRecipeBySearchInput(query));
      setQuery('');
    }

    // history.push('./recipes');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handeClick = (e: MouseEvent<HTMLButtonElement>): void => {
    console.log('tere');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* <label className={styles.label} htmlFor="search">
        Search recipe:
      </label> */}
      <input
        placeholder="Search recipes..."
        className={styles.input}
        type="text"
        id="search"
        name="search"
        value={query}
        onChange={handleChange}
        ref={inputRef}
      />
      <button
        onClick={handeClick}
        className={styles.btn}
        type="submit"
        aria-label="Click to search recipes"
        title="Click to search recipes"
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default Search;
