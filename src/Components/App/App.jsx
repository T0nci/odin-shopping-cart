import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <main>
        <div className="container">
          <header>Home</header>
          <h1 className={styles.heading}>Welcome to FakeStore!</h1>
          <p className={styles.paragraph}>
            Discover a world of curated, high-quality products designed to make
            your life easier and more enjoyable. At FakeStore, we’re passionate
            about bringing you the latest trends and timeless essentials at
            unbeatable prices. Whether you’re shopping for cutting-edge gadgets,
            stylish fashion, or unique home decor, our diverse selection ensures
            that there’s something for everyone. Browse our collections, enjoy
            seamless shopping experiences, and let us help you find exactly what
            you need. Dive into FakeStore today—where exceptional finds are just
            a click away!
          </p>
        </div>
      </main>
    </>
  );
};

export default App;
