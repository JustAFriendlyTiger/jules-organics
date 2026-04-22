export default function AnnouncementBar() {
  return (
    <div className="announcement-bar text-center py-2.5 px-4">
      <p className="section-label" style={{ color: "#B8CCA8", letterSpacing: "0.15em" }}>
        Free shipping on orders over $75 &nbsp;·&nbsp; Use code{" "}
        <span style={{ color: "#FAF8F4" }}>SHIPFREE75</span>
      </p>
    </div>
  );
}
