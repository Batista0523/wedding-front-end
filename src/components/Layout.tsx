const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAF7F2, #FFFFFF)",
        padding: "4rem 1rem",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9 mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
