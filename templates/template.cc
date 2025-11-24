#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <cmath>
#include <iomanip>
#include <chrono>
#include <sys/resource.h>
using namespace std;

#ifdef NEAL_DEBUG
#define dbg(x) cerr << #x << " = " << (x) << endl
#else
#define dbg(x)
#endif

void run_case() {
    
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
#ifdef NEAL_DEBUG
    freopen("A-1.in", "r", stdin);
    auto start = chrono::high_resolution_clock::now();
#endif
    
    int tests = 1;
    // cin >> tests;
    while (tests--) run_case();
    
#ifdef NEAL_DEBUG
    auto end = chrono::high_resolution_clock::now();
    double time_taken = chrono::duration_cast<chrono::nanoseconds>(end - start).count();
    time_taken *= 1e-9;
    
    struct rusage usage;
    getrusage(RUSAGE_SELF, &usage);
    double memory_mb = usage.ru_maxrss / 1024.0 / 1024.0;
    
    cerr << "\n-------------------\n";
    cerr << "Time: " << fixed << setprecision(6) << time_taken << " sec\n";
    cerr << "Memory: " << fixed << setprecision(2) << memory_mb << " MB\n";
#endif
    
    return 0;
}
