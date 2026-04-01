export function BookCardSkeleton() {
  return (
    <div className="book-card skeleton__card">
      <div className="skeleton skeleton__img" />
      <div className="skeleton skeleton__line skeleton__title" />
      <div className="skeleton skeleton__line skeleton__author" />
      <div className="skeleton skeleton__line skeleton__subtitle" />
      <div className="skeleton skeleton__line skeleton__meta" />
    </div>
  )
}

export function SelectedSkeleton() {
  return (
    <div className="selected-card skeleton__selected">
      <div className="selected-left">
        <div className="skeleton skeleton__line" style={{ height: 16, marginBottom: 8 }} />
        <div className="skeleton skeleton__line" style={{ height: 16, marginBottom: 8 }} />
        <div className="skeleton skeleton__line" style={{ height: 16, width: "60%" }} />
      </div>
      <div className="selected-middle">
        <div className="skeleton" style={{ width: 150, height: 200, borderRadius: 4 }} />
      </div>
      <div className="selected-right">
        <div className="skeleton skeleton__line" style={{ height: 20, marginBottom: 8 }} />
        <div className="skeleton skeleton__line skeleton__author" />
        <div className="skeleton skeleton__line" style={{ height: 14, width: "50%", marginTop: 12 }} />
      </div>
    </div>
  )
}

export function BookDetailSkeleton() {
  return (
    <div className="book-detail__skeleton">
      <div className="book-detail__left">
        <div className="skeleton" style={{ height: 36, width: "70%", marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 20, width: "40%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 18, width: "90%", marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 16, width: "50%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: "60%", marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 44, width: 120, borderRadius: 4, display: "inline-block", marginRight: 12 }} />
        <div className="skeleton" style={{ height: 44, width: 120, borderRadius: 4, display: "inline-block" }} />
        <div className="skeleton" style={{ height: 16, width: "40%", marginTop: 16, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 16, width: "30%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 32, width: 140, borderRadius: 20 }} />
        <div className="skeleton" style={{ height: 16, width: "100%", marginTop: 24, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: "100%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
      </div>
      <div>
        <div className="skeleton" style={{ width: 200, height: 280, borderRadius: 8 }} />
      </div>
    </div>
  )
}
