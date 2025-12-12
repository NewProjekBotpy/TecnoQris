export default function handler(req, res) {
  res.json({ 
    status: "ok", 
    timestamp: Date.now(),
    message: "Minimal ping endpoint"
  });
}
