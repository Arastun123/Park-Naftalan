export default function Video() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0", 
      }}
    >
      <div
        style={{
          width: "1310px",
          maxWidth: "100%",
          aspectRatio: "16 / 9",
          position: "relative",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1"
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
