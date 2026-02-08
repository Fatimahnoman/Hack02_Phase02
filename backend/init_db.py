#!/usr/bin/env python
"""
Script to initialize the database tables.
Run this script once after deployment to create the necessary tables.
"""

import sys
from pathlib import Path

# Add the src directory to the path so we can import modules
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

from src.database.database import create_db_and_tables

if __name__ == "__main__":
    print("Creating database tables...")
    create_db_and_tables()
    print("Database tables created successfully!")