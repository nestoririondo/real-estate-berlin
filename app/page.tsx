const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-4 border-blue-500 bg-blue-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-7xl">Header</div>
      </header>

      {/* Hero Section */}
      <section className="border-4 border-green-500 bg-green-100 p-8 md:p-16 flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-7xl">Hero</div>
      </section>

      {/* Section 1 */}
      <section className="border-4 border-purple-500 bg-purple-100 p-8 md:p-16 flex items-center justify-center min-h-[300px]">
        <div className="w-full max-w-7xl">Section 1</div>
      </section>

      {/* Section 2 */}
      <section className="border-4 border-orange-500 bg-orange-100 p-8 md:p-16 flex items-center justify-center min-h-[300px]">
        <div className="w-full max-w-7xl">Section 2</div>
      </section>

      {/* Footer */}
      <footer className="border-4 border-red-500 bg-red-100 p-4 flex items-center justify-center mt-auto">
        <div className="w-full max-w-7xl">Footer</div>
      </footer>
    </div>
  );
};

export default Home;
