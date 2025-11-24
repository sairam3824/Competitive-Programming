# Competitive Programming Environment

A streamlined setup for competitive programming with support for C++, Java, and Python. Features automatic compilation, execution, and performance tracking (time and memory usage).

## Features

- **Multi-language support**: C++, Java, and Python
- **Template-based workflow**: Quick file creation from pre-configured templates
- **Performance tracking**: Automatic time and memory usage reporting
- **Debug mode**: Built-in debugging support for C++
- **Organized structure**: Separate folders for each language

## Project Structure

```
.
├── codes/
│   ├── cpp/          # C++ solutions
│   ├── java/         # Java solutions
│   └── py/           # Python solutions
├── templates/
│   ├── template.cc   # C++ template with fast I/O and debug macros
│   ├── template.java # Java template with BufferedReader
│   └── template.py   # Python template with performance tracking
├── .zshrc_competitive_programming # Shell functions for quick workflow
├── create            # Script to create new files from templates
└── run               # Script to compile and run solutions
```

## Setup Instructions

### macOS / Linux

#### Prerequisites
- **C++**: Install Xcode Command Line Tools (macOS) or g++ (Linux)
  ```bash
  # macOS
  xcode-select --install
  
  # Linux (Ubuntu/Debian)
  sudo apt-get install g++
  ```
- **Java**: Install JDK 11 or higher
  ```bash
  # macOS (using Homebrew)
  brew install openjdk
  
  # Linux (Ubuntu/Debian)
  sudo apt-get install default-jdk
  ```
- **Python**: Python 3.6+ (usually pre-installed)

#### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Make scripts executable:
   ```bash
   chmod +x create run setup.sh
   ```

#### Option 1: Use Shell Functions (Recommended)

Add the following to your `~/.zshrc` (or `~/.bashrc` for bash):

```bash
# Source the competitive programming setup
source /path/to/your/project/.zshrc_competitive_programming
```

Replace `/path/to/your/project/` with the actual path to this directory.

Reload your shell:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

Now you can use these commands from anywhere:

**Create a new file:**
```bash
cf A.cc        # Creates codes/cpp/A.cc from template
cf 342.java    # Creates codes/java/342.java from template
cf app.py      # Creates codes/py/app.py from template
```

**Compile and run:**
```bash
cfrun A.cc     # Compiles and runs codes/cpp/A.cc
cfrun 342.java # Compiles and runs codes/java/342.java
cfrun app.py   # Runs codes/py/app.py
```

#### Option 2: Use Scripts Directly

Navigate to the project directory and use the scripts:

**Create a new file:**
```bash
./create A.cc   # Creates A.cc from template.cc in current directory
```

**Compile and run:**
```bash
./run A.cc      # Compiles and runs A.cc
```

### Windows

#### Prerequisites
- **C++**: Install MinGW-w64 or use WSL (Windows Subsystem for Linux)
  - **MinGW-w64**: Download from [winlibs.com](https://winlibs.com/) and add to PATH
  - **WSL**: Follow [Microsoft's WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install)
- **Java**: Install JDK 11 or higher from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- **Python**: Download from [python.org](https://www.python.org/downloads/)

#### Option 1: Using WSL (Recommended)

1. Install WSL and a Linux distribution (Ubuntu recommended)
2. Follow the macOS/Linux instructions above inside WSL

#### Option 2: Using PowerShell/CMD

Create batch files for Windows:

**create.bat:**
```batch
@echo off
if "%1"=="" (
    echo Usage: create.bat ^<filename^>
    exit /b 1
)

set FILENAME=%1

if not "%FILENAME:~-3%"==".cc" (
    set FILENAME=%FILENAME%.cc
)

if exist "%FILENAME%" (
    echo File %FILENAME% already exists!
    exit /b 1
)

copy templates\template.cc "%FILENAME%"
echo Created %FILENAME% from template
```

**run.bat:**
```batch
@echo off
if "%1"=="" (
    echo Usage: run.bat ^<filename^>
    exit /b 1
)

set FILENAME=%1

if not "%FILENAME:~-3%"==".cc" (
    set FILENAME=%FILENAME%.cc
)

if not exist "%FILENAME%" (
    echo File %FILENAME% does not exist!
    exit /b 1
)

set BASENAME=%FILENAME:.cc=%

echo Compiling %FILENAME%...
g++ -std=c++17 -O2 -Wall -Wextra -DNEAL_DEBUG "%FILENAME%" -o "%BASENAME%.exe"

if errorlevel 1 (
    echo Compilation failed!
    exit /b 1
)

echo Running %BASENAME%.exe...
echo -------------------
"%BASENAME%.exe"
```

**Usage:**
```cmd
create.bat A.cc
run.bat A.cc
```

#### Option 3: Using Git Bash

If you have Git for Windows installed, you can use Git Bash and follow the macOS/Linux instructions.

## Usage Examples

### Quick Start

1. **Create a new C++ solution:**
   ```bash
   cf A.cc
   ```

2. **Edit the file** in `codes/cpp/A.cc` and write your solution in the `run_case()` function

3. **Create an input file** (optional): `codes/cpp/A-1.in` for testing

4. **Run your solution:**
   ```bash
   cfrun A.cc
   ```

5. **View performance metrics** in the output (time and memory usage)

### Working with Different Languages

**C++:**
```bash
cf problem.cc
cfrun problem.cc
```

**Java:**
```bash
cf Solution.java
cfrun Solution.java
```

**Python:**
```bash
cf solution.py
cfrun solution.py
```

## Template Features

### C++ Template
- Fast I/O with `ios::sync_with_stdio(false)`
- Common headers pre-included (vector, algorithm, map, set, etc.)
- Debug macro: `dbg(x)` prints variable name and value
- Automatic input file reading in debug mode (`A-1.in`)
- Performance tracking (time and memory)

### Java Template
- BufferedReader for fast input
- PrintWriter for fast output
- Performance tracking built-in

### Python Template
- Type hints support
- Memory tracking with `tracemalloc`
- Time tracking with `time` module

## Tips

- **Multiple test cases**: Uncomment `cin >> tests;` in templates
- **Debug mode**: C++ template automatically reads from `<filename>-1.in` when compiled with `-DNEAL_DEBUG`
- **Performance**: All templates include automatic time and memory usage reporting
- **Organization**: Keep solutions organized by language in respective folders

## Troubleshooting

### macOS: "command not found: g++"
Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### Windows: "g++ is not recognized"
Add MinGW bin directory to your PATH environment variable, or use WSL.

### "Permission denied" on macOS/Linux
Make scripts executable:
```bash
chmod +x create run setup.sh
```

### Shell functions not working
Make sure you've sourced the configuration file and used the correct path:
```bash
source ~/.zshrc  # or ~/.bashrc
```

## License

Free to use for competitive programming practice and contests.
