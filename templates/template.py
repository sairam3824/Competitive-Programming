import sys
import time
import tracemalloc
from typing import List, Tuple, Set, Dict

def solve():
    # Your solution here
    pass

def main():
    tracemalloc.start()
    start_time = time.time()
    
    tests = 1
    # tests = int(input())
    
    for _ in range(tests):
        solve()
    
    end_time = time.time()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    print("\n-------------------", file=sys.stderr)
    print(f"Time: {end_time - start_time:.6f} sec", file=sys.stderr)
    print(f"Memory: {peak / 1024 / 1024:.2f} MB", file=sys.stderr)

if __name__ == "__main__":
    main()
