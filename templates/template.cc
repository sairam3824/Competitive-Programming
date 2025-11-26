#include <algorithm>
#include <array>
#include <bitset>
#include <cassert>
#include <chrono>
#include <cstdint>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <map>
#include <numeric>
#include <queue>
#include <random>
#include <set>
#include <vector>
using namespace std;

template <class Fun> class y_comb {
  Fun fun_;

public:
  template <class T> explicit y_comb(T &&fun) : fun_(std::forward<T>(fun)) {}
  template <class... Args> decltype(auto) operator()(Args &&...args) {
    return fun_(std::ref(*this), std::forward<Args>(args)...);
  }
};
template <class Fun> decltype(auto) make_y_comb(Fun &&fun) {
  return y_comb<std::decay_t<Fun>>(std::forward<Fun>(fun));
}

template <typename A, typename B>
ostream &operator<<(ostream &os, const pair<A, B> &p) {
  return os << '(' << p.first << ", " << p.second << ')';
}

template <typename T_container, typename T = typename enable_if<
                                    !is_same<T_container, string>::value,
                                    typename T_container::value_type>::type>
ostream &operator<<(ostream &os, const T_container &v) {
  os << '{';
  string sep;
  for (const T &x : v)
    os << sep << x, sep = ", ";
  return os << '}';
}

void trace_out() { cerr << endl; }
template <typename Head, typename... Tail> void trace_out(Head H, Tail... T) {
  cerr << ' ' << H;
  trace_out(T...);
}

#ifdef DEBUG
#define trace(...) cerr << "(" << #__VA_ARGS__ << "):", trace_out(__VA_ARGS__)
#else
#define trace(...)
#endif

void solve() {}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int tests = 1;
  cin >> tests;
  while (tests--)
    solve();
}
