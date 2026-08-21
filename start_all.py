import subprocess
import time
import os
import sys

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "food-booking", "backend")
    frontend_dir = os.path.join(base_dir, "frontend")

    print(f"🚀 Starting Backend API in {backend_dir}...")
    backend = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
        cwd=backend_dir
    )

    print(f"⚡ Starting Frontend Vite Server in {frontend_dir}...")
    vite_bin = os.path.join(frontend_dir, "node_modules", ".bin", "vite.cmd" if os.name == 'nt' else "vite")
    if os.path.exists(vite_bin):
        frontend = subprocess.Popen(
            [vite_bin],
            cwd=frontend_dir
        )
    else:
        print("Vite binary not found in node_modules, falling back to npx...")
        frontend = subprocess.Popen(
            ["npx", "vite"],
            cwd=frontend_dir,
            shell=True
        )

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping all services...")
        backend.terminate()
        frontend.terminate()

if __name__ == "__main__":
    main()

