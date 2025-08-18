import 'modern-normalize';
import css from './App.module.css';
import NodeList from '../NodeList/NodeList';

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
      <NodeList />
    </div>
  );
}

export default App;
