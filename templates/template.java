import java.util.*;
import java.io.*;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static PrintWriter out = new PrintWriter(System.out);
    
    public static void main(String[] args) throws IOException {
        long startTime = System.nanoTime();
        
        int tests = 1;
        // tests = Integer.parseInt(br.readLine());
        
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
        // Your solution here
        
    }
}
