import java.util.*;
import java.io.*;

public class Main {
    static BufferedReader br;
    static StringTokenizer st;
    static PrintWriter out;

    public static void main(String[] args) throws IOException {
        br = new BufferedReader(new InputStreamReader(System.in));
        out = new PrintWriter(System.out);

        // Check for input file
        File inputFile = new File("PROBLEM_NAME-1.in");
        if (inputFile.exists()) {
            br = new BufferedReader(new FileReader(inputFile));
        }

        long startTime = System.nanoTime();

        int tests = 1;
        if (br.ready()) {
            // Try to read tests if input is available, otherwise default to 1
            try {
                String line = br.readLine();
                if (line != null && !line.isEmpty()) {
                    tests = Integer.parseInt(line.trim());
                }
            } catch (Exception e) {
            }
        }

        // If you want to read tests from input always, uncomment:
        // tests = Integer.parseInt(next());

        while (tests-- > 0) {
            solve();
        }

        out.flush();

        long endTime = System.nanoTime();
        double timeInSeconds = (endTime - startTime) / 1e9;
        long memoryUsed = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024);

        System.err.println("\n-------------------");
        System.err.printf("Time: %.6f sec\n", timeInSeconds);
        System.err.printf("Memory: %d MB\n", memoryUsed);
    }

    static void solve() throws IOException {

    }

    static String next() throws IOException {
        while (st == null || !st.hasMoreTokens()) {
            String line = br.readLine();
            if (line == null)
                return null;
            st = new StringTokenizer(line);
        }
        return st.nextToken();
    }

    static int nextInt() throws IOException {
        return Integer.parseInt(next());
    }

    static long nextLong() throws IOException {
        return Long.parseLong(next());
    }

    static double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }
}
