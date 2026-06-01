<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#306998]"></div>
            <div class="w-3 h-3 rounded-full bg-[#FFD43B]"></div>
          </div>
          <h1 class="text-xl font-bold text-slate-800 tracking-tight">Python 模块与魔术方法速查</h1>
        </div>
      </div>
    </header>

    <!-- Tab 切换 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div class="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200" :class="activeTab === tab.key
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
            ">
          {{ tab.label }}
          <span class="ml-1.5 text-xs opacity-60">({{ tab.count }})</span>
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
      <!-- 常用模块 -->
      <div v-show="activeTab === 'common'" class="space-y-8">
        <div v-for="group in commonModuleGroups" :key="group.category" class="space-y-3">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: group.color }"></span>
            {{ group.category }}
            <span class="font-normal normal-case text-xs text-slate-400">({{ group.modules.length }})</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div v-for="mod in group.modules" :key="mod.name" @click="toggleDetail(mod.name)"
              class="bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 group/card cursor-pointer">
              <div class="flex items-center justify-between">
                <code
                  class="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md group-hover/card:bg-indigo-100 transition-colors">{{ mod.name }}</code>
                <span v-if="mod.detail" class="text-xs text-slate-300 transition-transform duration-200"
                  :class="{ 'rotate-180': expanded.has(mod.name) }">▼</span>
              </div>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">{{ mod.description }}</p>
              <!-- 展开详情 -->
              <div v-if="mod.detail && expanded.has(mod.name)"
                class="mt-3 pt-3 border-t border-slate-100 space-y-2">
                <p class="text-[0.7rem] text-slate-500 leading-relaxed whitespace-pre-line">{{ mod.detail }}</p>
                <div v-if="mod.example" class="bg-slate-800 rounded px-2 py-1.5 overflow-x-auto">
                  <pre class="text-slate-200 text-[0.6rem] font-mono leading-relaxed"><code>{{ mod.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 必学模块 -->
      <div v-show="activeTab === 'essential'" class="space-y-8">
        <div v-for="group in essentialModuleGroups" :key="group.category" class="space-y-3">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: group.color }"></span>
            {{ group.category }}
            <span class="font-normal normal-case text-xs text-slate-400">({{ group.modules.length }})</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div v-for="mod in group.modules" :key="mod.name" @click="toggleDetail(mod.name)"
              class="bg-white rounded-xl p-4 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 group/card cursor-pointer relative overflow-hidden">
              <div
                class="absolute top-0 right-0 w-8 h-8 bg-amber-50 rounded-bl-xl -mr-1 -mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
              </div>
              <div class="flex items-center justify-between">
                <code
                  class="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md group-hover/card:bg-amber-100 transition-colors relative">{{ mod.name }}</code>
                <span v-if="mod.detail" class="text-xs text-slate-300 transition-transform duration-200 relative"
                  :class="{ 'rotate-180': expanded.has(mod.name) }">▼</span>
              </div>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed relative">{{ mod.description }}</p>
              <!-- 展开详情 -->
              <div v-if="mod.detail && expanded.has(mod.name)"
                class="mt-3 pt-3 border-t border-slate-100 space-y-2 relative">
                <p class="text-[0.7rem] text-slate-500 leading-relaxed whitespace-pre-line">{{ mod.detail }}</p>
                <div v-if="mod.example" class="bg-slate-800 rounded px-2 py-1.5 overflow-x-auto">
                  <pre class="text-slate-200 text-[0.6rem] font-mono leading-relaxed"><code>{{ mod.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 魔术方法 -->
      <div v-show="activeTab === 'magic'" class="space-y-6">
        <div v-for="group in magicMethodGroups" :key="group.category"
          class="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div class="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: group.color }"></span>
            <h3 class="text-sm font-semibold text-slate-700">{{ group.category }}</h3>
            <span class="text-xs text-slate-400">({{ group.methods.length }} 个方法)</span>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div v-for="method in group.methods" :key="method.name"
                class="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/method">
                <code
                  class="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded shrink-0 group-hover/method:bg-rose-100 transition-colors">{{ method.name }}</code>
                <span class="text-xs text-slate-500 leading-relaxed pt-0.5">{{ method.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-slate-400">
        Python 模块速查 · 点击卡片展开详情与API示例 · 数据仅供学习参考
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// --- 类型定义 ---
interface ModuleItem {
  name: string
  description: string
  detail?: string
  example?: string
}

interface ModuleGroup {
  category: string
  color: string
  modules: ModuleItem[]
}

interface MagicMethodItem {
  name: string
  description: string
}

interface MagicMethodGroup {
  category: string
  color: string
  methods: MagicMethodItem[]
}

// --- 展开/折叠状态 ---
const expanded = ref(new Set<string>())
function toggleDetail(name: string) {
  const next = new Set(expanded.value)
  if (next.has(name)) next.delete(name)
  else next.add(name)
  expanded.value = next
}

// --- Tab 状态 ---
const activeTab = ref<'common' | 'essential' | 'magic'>('common')

const tabs = [
  { key: 'common' as const, label: '常用模块', count: 57 },
  { key: 'essential' as const, label: '必学模块', count: 28 },
  { key: 'magic' as const, label: '魔术方法', count: 74 },
]

// --- 常用模块数据 ---
const commonModuleGroups: ModuleGroup[] = [
  {
    category: '系统与文件',
    color: '#3B82F6',
    modules: [
      {
        name: 'os', description: '操作系统接口，处理路径、环境变量、进程等。跨平台兼容 Windows/Linux/macOS，是 Python 与 OS 交互的核心桥梁。',
        detail: '提供文件和目录操作（创建、删除、重命名、os.walk 遍历）、环境变量读写（os.environ）、进程管理（os.getpid、os.system）、路径处理（os.path 子模块）。\n\n现代 Python 推荐用 pathlib 替代 os.path 做路径操作，语法更优雅。',
        example: 'os.getcwd()              # 当前工作目录\nos.listdir(".")          # 列出目录\nos.environ["HOME"]       # 读取环境变量\nos.mkdir("dir")          # 创建目录\nos.path.join("a","b")    # 路径拼接\nos.path.exists("file")   # 判断路径是否存在\nos.walk("dir")           # 递归遍历目录树',
      },
      {
        name: 'sys', description: 'Python 解释器运行时环境，提供命令行参数（argv）、模块搜索路径（path）、标准输入输出流、递归深度限制等解释器级控制。',
        detail: 'sys.argv 是获取脚本命令行参数的标准方式；sys.path 控制 import 搜索路径；sys.stdin/stdout/stderr 用于管道和重定向；sys.exit() 退出程序。\n\nsys.getsizeof() 获取对象内存大小，sys.setrecursionlimit() 调整递归深度上限。',
        example: 'sys.argv                  # 命令行参数列表\nsys.exit(0)               # 退出程序\nsys.path.append("/lib")   # 添加模块路径\nsys.stdin.read()          # 读取标准输入\nsys.version               # Python 版本\nsys.getsizeof(obj)        # 对象内存大小',
      },
      {
        name: 'pathlib', description: '面向对象的文件路径操作（Python 3.4+），用 Path 对象替代字符串拼接，/ 操作符连接路径，链式调用，官方推荐替代 os.path。',
        detail: 'Path 对象支持 / 操作符拼接路径，比 os.path.join 更直观。内置 read_text/read_bytes/write_text 等文件读写方法。glob("**/*.py") 递归匹配文件。\n\n纯路径（PurePath）不访问文件系统，适合跨平台路径运算。新项目一律使用 pathlib。',
        example: 'Path("file.txt").read_text()         # 读取文本\nPath("dir").mkdir(exist_ok=True)      # 创建目录\nPath.home() / "project" / "src"       # / 拼接路径\nPath(".").glob("**/*.py")             # 递归搜索\np.suffix / p.stem / p.parent          # 后缀/无后缀名/父目录',
      },
      {
        name: 'shutil', description: '高级文件操作工具集，文件/目录的复制、移动、递归删除、归档压缩（zip/tar）、磁盘空间查询。比 os 模块更上层的封装。',
        detail: 'copy2() 复制文件并保留元数据；copytree() 递归复制目录；rmtree() 递归删除（危险操作）；make_archive() 创建压缩包；disk_usage() 获取磁盘容量。\n\n注意：rmtree 不可逆，生产环境使用前应加确认逻辑。',
        example: 'shutil.copy2("src", "dst")          # 复制保留元数据\nshutil.copytree("src", "dst")      # 递归复制目录\nshutil.rmtree("dir")               # 递归删除\nshutil.make_archive("a","zip","d") # 创建压缩包\nshutil.disk_usage("/")             # 磁盘空间',
      },
      {
        name: 'glob', description: 'Unix 风格的文件名模式匹配，使用通配符（* ? [...]）查找文件，** 递归搜索。适合文件批处理、构建脚本。',
        detail: '通配符：* 匹配任意字符，? 匹配单个字符，[...] 字符类，** 递归匹配（需 recursive=True）。iglob() 返回迭代器节省内存。',
        example: 'glob.glob("*.py")                     # 当前目录 py 文件\nglob.glob("**/*.py", recursive=True)    # 递归搜索\nglob.glob("data/**/*.csv")              # data下所有csv\nglob.iglob("*")                         # 迭代器（省内存）',
      },
      {
        name: 'tempfile', description: '安全创建临时文件和目录，支持自动清理。适用于测试、中间文件、缓存等场景，避免手动管理临时文件的生命周期。',
        detail: 'TemporaryFile 创建匿名临时文件；NamedTemporaryFile 可获取路径；TemporaryDirectory 退出上下文自动递归删除。文件名随机生成防止竞态条件，权限默认仅当前用户可读写。',
        example: 'tempfile.TemporaryDirectory()             # 临时目录自动删除\nwith tempfile.NamedTemporaryFile() as f:    # 上下文管理\n    f.write(b"data")\ntempfile.gettempdir()                        # 系统临时目录',
      },
      {
        name: 'subprocess', description: '执行外部命令和管理子进程的推荐方式，替代 os.system。支持捕获输出、设置超时、管道连接、环境变量注入。',
        detail: 'run() 是 Python 3.5+ 推荐接口，执行并等待完成。Popen() 用于非阻塞执行。优先使用列表参数 ["cmd","arg1"] 避免 shell 注入。如需 shell 特性，显式设置 shell=True 但需谨慎。',
        example: 'subprocess.run(["ls", "-l"])               # 执行命令\nsubprocess.run(["cmd"], capture_output=True)  # 捕获输出\nsubprocess.run(["cmd"], timeout=30)           # 超时\nsubprocess.Popen(["cmd"], stdout=PIPE)        # 非阻塞\nsubprocess.check_output(["cmd"])              # 直接获取输出',
      },
      { name: 'platform', description: '获取操作系统平台信息，包括系统名称、版本、架构、Python 构建信息等。用于跨平台兼容性判断。' },
      { name: 'stat', description: '解析文件状态信息（mode、size、atime、mtime 等），底层系统调用 stat() 的 Python 接口。' },
      { name: 'fileinput', description: '迭代多输入流，方便处理多文件。自动按行遍历命令行参数指定的所有文件，支持原地修改（in-place）。' },
    ],
  },
  {
    category: '数据处理',
    color: '#10B981',
    modules: [
      {
        name: 'json', description: 'JSON 编解码，Web API 和配置文件的事实标准格式。支持对象-字典映射、自定义编码器、缩进美化输出。',
        detail: 'dict↔JSON object、list↔JSON array 双向映射。indent 参数控制缩进，sort_keys 按键排序。default 参数处理 datetime 等非标准类型。object_hook 自定义解码。\n\n注意：tuple 编码后变 list，解码不还原；NaN/Infinity 非标准 JSON。',
        example: 'json.dumps(obj)                     # 对象→JSON字符串\njson.dumps(obj, indent=2)            # 美化输出\njson.dump(obj, file)                 # 写入文件\njson.loads(s)                        # JSON字符串→对象\njson.load(file)                      # 从文件读取',
      },
      {
        name: 'csv', description: 'CSV 文件读写，支持自定义分隔符、引号规则、方言预设。适用于数据导出、表格处理、与 Excel 交互。',
        detail: 'reader/writer 基于列表，DictReader/DictWriter 基于字典（列名作 key）。delimiter 分隔符可改为 \\t 处理 TSV。\n\n注意：写入时必须设置 newline=""，否则 Windows 上出现多余空行。',
        example: 'with open("data.csv") as f:\n    reader = csv.reader(f)\n    for row in reader: ...\n\ncsv.DictReader(f)                    # 按列名读为字典\ncsv.DictWriter(f, fieldnames=cols)   # 从字典写入',
      },
      {
        name: 'pickle', description: 'Python 对象二进制序列化，可将任意 Python 对象保存到文件或网络传输。仅限 Python 使用，不跨语言且不安全。',
        detail: 'protocol=5（Python 3.8+）支持带外数据。vs json：pickle 支持 Python 特有类型但不可跨语言、不安全。\n\n⚠️ 安全警告：永远不要 unpickle 不可信来源的数据，可执行任意代码。跨语言或安全敏感场景用 json 或 protobuf。',
        example: 'pickle.dump(obj, file)              # 序列化到文件\nobj = pickle.load(file)             # 从文件反序列化\nbytes_data = pickle.dumps(obj)      # 序列化为字节',
      },
      {
        name: 'struct', description: 'Python 值与 C 结构体之间的二进制转换。用于处理二进制文件格式、网络协议封包/解包、与 C 程序交互。',
        detail: '格式字符：i=int(4字节)、q=long long(8字节)、f=float(4字节)、d=double(8字节)、s=字符串。字节序：< 小端、> 大端、! 网络序。\n\nStruct 类预编译格式，重复使用更高效。',
        example: 'struct.pack("i", 42)                 # int→4字节\nstruct.pack(">I", 0x1234)            # 大端序\nstruct.unpack("i", data)             # 字节→(42,)\nstruct.calcsize("iif")              # 计算字节数',
      },
      {
        name: 'io', description: 'I/O 流核心工具，提供文本 I/O、二进制 I/O、原始 I/O 的统一抽象。StringIO 和 BytesIO 让字符串/字节像文件一样操作。',
        detail: 'StringIO：内存文本流，替代文件对象做测试或字符串拼接。BytesIO：内存字节流。redirect_stdout 配合使用可捕获输出。',
        example: 'f = io.StringIO("initial text")\nf.write(" more")\nf.getvalue()                     # "initial text more"\nio.BytesIO(b"binary data")       # 内存字节流',
      },
      {
        name: 'sqlite3', description: '轻量级嵌入式关系型数据库，无需独立服务端，数据库即单个文件。支持完整 SQL，适合原型开发、本地存储、测试替身。',
        detail: 'Python 标准库自带，零配置。支持事务、参数化查询（防 SQL 注入）、自定义函数/聚合、内存数据库。rows 工厂可返回 Row 对象或字典。',
        example: 'conn = sqlite3.connect("app.db")\nconn.execute("CREATE TABLE t (id int, name text)")\nconn.execute("INSERT INTO t VALUES (?,?)", (1,"a"))\nconn.commit()\nconn.close()',
      },
      { name: 'base64', description: 'Base64 编解码，将二进制数据转为 ASCII 文本。用于 JSON/XML 嵌入二进制、JWT、Data URI、Kubernetes Secret 等场景。' },
      { name: 'html', description: 'HTML 实体编解码，unescape() 将 &amp; &lt; &gt; 等转为实际字符，escape() 反向操作。防 XSS 的基础工具。' },
    ],
  },
  {
    category: '时间与日期',
    color: '#8B5CF6',
    modules: [
      {
        name: 'datetime', description: '日期和时间处理的核心模块。提供 date、time、datetime、timedelta、tzinfo 等完整时间体系，支持格式化、解析和算术运算。',
        detail: 'datetime.now() 获取当前时间（naive 无时区）。strftime/strptime 格式化/解析。timedelta 做时间加减。Python 3.9+ 推荐 zoneinfo 处理时区。\n\n注意：datetime.now() 不带时区，跨时区应用应使用 datetime.now(tz=ZoneInfo("Asia/Shanghai"))。',
        example: 'datetime.now()                         # 当前日期时间\ndatetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 格式化\ndatetime.strptime("2024-01-01", "%Y-%m-%d")   # 解析\nnow + timedelta(days=7)                       # 7天后',
      },
      {
        name: 'time', description: '底层时间访问和转换，提供 Unix 时间戳、休眠、性能计时。与 C 标准库 time.h 对应，侧重秒级精度的时间操作。',
        detail: 'time() 返回 Unix 时间戳。perf_counter() 高精度性能计时（含 sleep）。monotonic() 单调时钟不受系统时间调整影响。\n\n一般优先用 datetime 做时间处理，time 用于性能测量和简单休眠。',
        example: 'time.time()                     # Unix 时间戳\ntime.sleep(1)                   # 休眠1秒\ntime.perf_counter()             # 高精度计时\ntime.monotonic()                # 单调时钟',
      },
      { name: 'calendar', description: '日历相关功能，生成月历/年历文本、判断闰年、获取某月天数、计算星期几、月份/星期名称常量。' },
      { name: 'zoneinfo', description: 'IANA 时区数据库支持（Python 3.9+），替代 pytz。ZoneInfo("Asia/Shanghai") 获取时区对象，比 pytz 更简洁。' },
    ],
  },
  {
    category: '数学与统计',
    color: '#F59E0B',
    modules: [
      {
        name: 'math', description: '数学函数库，三角函数、对数指数、取整、阶乘、GCD/LCM、常量（π, e, τ）。对标 C 标准数学库 libm，数值计算基础。',
        example: 'math.sqrt(16)              # 4.0\nmath.pow(2, 10)             # 1024.0\nmath.sin(math.pi/2)         # 三角函数（弧度）\nmath.ceil(3.1)→4  floor→3   # 取整\nmath.gcd(12,8)→4            # 最大公约数\nmath.comb(5,2)→10           # 组合数',
      },
      {
        name: 'random', description: '伪随机数生成器，支持整数/浮点随机数、序列随机选择/打乱、加权抽样、分布函数。适用于模拟、游戏，不适用于密码学安全。',
        detail: 'Mersenne Twister 算法。randint(a,b) 含两端，choices() 加权可重复抽样，sample() 不放回抽样，shuffle() 原地打乱。\n\n⚠️ 密码学场景用 secrets 模块。多线程环境下使用 Random() 实例而非模块级函数。',
        example: 'random.randint(1, 100)                # [1,100] 随机整数\nrandom.random()                        # [0,1) 浮点\nrandom.choice(["a","b","c"])           # 随机选一\nrandom.choices(lst, k=5, weights=w)    # 加权抽样\nrandom.sample(lst, k=3)               # 不放回\nrandom.shuffle(lst)                    # 原地打乱',
      },
      { name: 'statistics', description: '统计函数库，均值（mean）、中位数（median）、标准差（stdev）、方差（variance）、分位数等。小而精的统计工具箱。' },
      {
        name: 'decimal', description: '高精度十进制浮点运算，避免二进制浮点误差。金融计算、货币处理场景的首选。支持自定义精度和舍入模式。',
        detail: 'Decimal("0.1") + Decimal("0.2") == Decimal("0.3") 精确成立。getcontext().prec 设置全局精度。舍入模式：ROUND_HALF_UP、ROUND_DOWN 等。\n\n性能约为 float 的 100 倍慢，仅在需要精确计算时使用。',
        example: 'from decimal import Decimal, getcontext\ngetcontext().prec = 6                       # 6位精度\nDecimal("0.1") + Decimal("0.2")             # Decimal("0.3")\nDecimal("1.234").quantize(Decimal("0.01"))  # 1.23',
      },
      { name: 'fractions', description: '分数类型，精确有理数运算。Fraction(1, 3) + Fraction(1, 3) = Fraction(2, 3)，无精度损失。' },
      { name: 'numbers', description: '数值抽象基类（Number、Complex、Real、Rational、Integral），定义数值类型层次，用于自定义数值类型的类型检查。' },
    ],
  },
  {
    category: '函数式与迭代',
    color: '#EC4899',
    modules: [
      {
        name: 'functools', description: '高阶函数工具集，lru_cache 缓存装饰器、partial 偏函数、reduce 累积归约、wraps 保留元信息、total_ordering 自动补全比较。',
        detail: 'lru_cache 是递归性能优化的利器；cache（3.9+）无限缓存；partial 固定部分参数生成新函数；reduce 从左到右累积归约序列。\n\n实际应用：API 结果缓存、昂贵计算 memoization、装饰器编写。',
        example: '@lru_cache(maxsize=128)\ndef fib(n): return n if n<2 else fib(n-1)+fib(n-2)\n\npartial(func, arg1)                    # 偏函数\nreduce(lambda a,b: a+b, [1,2,3])      # 累积归约\n@wraps(original)                       # 保留元信息',
      },
      {
        name: 'itertools', description: '高效迭代器工具集，无限迭代器（count/cycle/repeat）、组合迭代器（product/permutations/combinations）、终止迭代器（chain/groupby/accumulate）。',
        detail: '所有函数返回惰性迭代器，适合处理大规模或无限序列。chain 串联多个可迭代对象；groupby 连续相同键分组（需先排序）；pairwise（3.10+）滑动窗口。',
        example: 'itertools.chain([1,2],[3,4])          # 串联\nitertools.product("AB","12")          # 笛卡尔积\nitertools.permutations([1,2,3],2)     # 排列\nitertools.combinations([1,2,3],2)     # 组合\nitertools.groupby(data, key=func)     # 分组\nitertools.islice(iter, 0, 10)         # 惰性切片',
      },
      {
        name: 'operator', description: '标准运算符的函数形式，替代简单 lambda。itemgetter 用于排序 key、attrgetter 提取属性、methodcaller 调用方法。',
        detail: 'operator.add 替代 lambda a,b: a+b，operator.itemgetter(1) 替代 lambda x: x[1]。比 lambda 更高效（C 实现）且更可读。',
        example: 'sorted(data, key=operator.itemgetter("age"))  # 按字典key排序\nsorted(objs, key=operator.attrgetter("name"))  # 按属性排序\noperator.methodcaller("strip")("  text  ")     # 调用方法',
      },
    ],
  },
  {
    category: '异步与并发',
    color: '#06B6D4',
    modules: [
      {
        name: 'asyncio', description: 'Python 异步 I/O 框架，基于事件循环和协程（async/await）。单线程处理成千上万连接，适用于高并发网络服务、WebSocket、爬虫。',
        detail: 'asyncio.run() 入口；create_task() 并发调度；gather() 并发等待多个协程；Queue 异步生产者-消费者。\n\n生态：aiohttp（HTTP）、aiofiles（文件I/O）、asyncpg（PostgreSQL）。',
        example: 'async def main():\n    await asyncio.sleep(1)\n    results = await asyncio.gather(\n        fetch(url1), fetch(url2))\nasyncio.run(main())\n\nqueue = asyncio.Queue()            # 异步队列',
      },
      {
        name: 'threading', description: '多线程编程接口，适用于 I/O 密集型任务。GIL 限制下 CPU 密集型应改用 multiprocessing。提供 Lock/Event/Condition/Semaphore 等同步原语。',
        detail: 'Thread 创建管理线程；Lock/RLock 互斥锁保护共享资源；Event 线程间信号；Condition 生产者-消费者；Semaphore 限制并发数；local() 线程隔离存储。\n\nGIL：CPython 同一时刻只有一个线程执行 Python 字节码，但 I/O 操作会释放 GIL。',
        example: 't = threading.Thread(target=func, args=(x,))\nt.start()\nt.join()\nlock = threading.Lock()\nwith lock: ...                      # 上下文加锁\nlocal = threading.local()           # 线程局部存储',
      },
      {
        name: 'multiprocessing', description: '多进程并行计算，每个进程独立 Python 解释器和 GIL，真正利用多核 CPU。附带进程间通信（Queue/Pipe）和共享状态（Manager）。',
        detail: 'Process 创建管理子进程；Pool 进程池自动管理 worker；Queue 进程安全队列；Pipe 双向管道；Manager 跨进程共享 Python 对象。\n\n注意：Windows 上启动方式需用 if __name__ == "__main__" 保护。',
        example: 'p = multiprocessing.Process(target=func)\np.start(); p.join()\npool = multiprocessing.Pool(4)       # 进程池\npool.map(func, iterable)             # 并行 map\nqueue = multiprocessing.Queue()      # 进程安全队列',
      },
      {
        name: 'concurrent.futures', description: '线程池和进程池的高级抽象接口，统一的 Executor API。submit/map 提交任务，Future 异步获取结果。比直接操作 threading/multiprocessing 更简洁。',
        detail: 'ThreadPoolExecutor 用于 I/O 密集；ProcessPoolExecutor 用于 CPU 密集。map() 保持输入顺序但并发执行。as_completed() 按完成顺序 yield。\n\n注意：ProcessPoolExecutor 要求函数和参数必须可 pickle。',
        example: 'with ThreadPoolExecutor(max_workers=4) as ex:\n    future = ex.submit(func, arg)\n    result = future.result()\n    results = ex.map(func, iterable)\n\nwith ProcessPoolExecutor() as ex:     # CPU密集\n    results = ex.map(cpu_heavy, data)',
      },
      {
        name: 'queue', description: '线程安全队列模块。Queue（FIFO）、LifoQueue（栈）、PriorityQueue（优先队列）。生产者-消费者模式的经典实现。',
        detail: 'put/get 阻塞等待；task_done() 标记完成；join() 等待所有任务完成。比手动用锁+列表实现队列更安全可靠。',
        example: 'q = queue.Queue(maxsize=10)\nq.put(item)\nitem = q.get()\nq.task_done()\nq.join()                           # 等待全部完成',
      },
    ],
  },
  {
    category: '类型与元编程',
    color: '#6366F1',
    modules: [
      {
        name: 'typing', description: '类型注解支持模块（Python 3.5+），提供泛型容器、Union、Optional、Protocol、TypedDict 等，配合 mypy/pyright 静态类型检查。',
        detail: 'Python 3.9+ 内置泛型（list[int] 替代 List[int]），3.10+ 联合类型用 X|Y 替代 Union[X,Y]。Protocol 实现结构化子类型（鸭子类型）。\n\n好处：IDE 自动补全更准确、重构更安全、团队协作更高效。运行时几乎零开销。',
        example: 'def process(items: list[int]) -> dict[str, int]: ...\nOptional[str]                   # str | None\nCallable[[int], str]            # 函数类型\nProtocol                        # 结构化子类型\nTypedDict                       # 类型化字典',
      },
      {
        name: 'dataclasses', description: '数据类装饰器（Python 3.7+），自动生成 __init__/__repr__/__eq__。一行代码替代样板类，支持默认值、不可变实例（frozen）。',
        detail: 'field() 可以设置 default、default_factory（可变默认值）、repr/compare=False（排除字段）。\n\n装饰器参数：frozen=True 生成不可变实例，order=True 生成比较方法。',
        example: '@dataclass\nclass Point:\n    x: int\n    y: int\n    color: str = "red"\n\n@dataclass(frozen=True)  # 不可变\nclass FrozenPoint:\n    x: int\n    y: int',
      },
      {
        name: 'enum', description: '枚举类型定义，为命名常量提供类型安全表示。支持自动赋值（auto）、标志组合（Flag）、整数枚举（IntEnum），替代魔术数字的最佳实践。',
        detail: 'Enum 标准枚举；IntEnum 兼容整数；StrEnum（3.11+）；Flag/IntFlag 支持位运算组合。\n\n优势：IDE 自动补全 + 类型检查，可读性和可维护性远高于魔数。',
        example: 'class Color(Enum):\n    RED = 1\n    GREEN = 2\n    BLUE = 3\nColor.RED.value          # 1\nColor(1)                 # Color.RED\n\nclass Permission(Flag):   # 支持位运算\n    READ = 1\n    WRITE = 2\n    READ | WRITE           # <Permission: 3>',
      },
      { name: 'abc', description: '抽象基类模块，定义接口规范。ABC 基类 + @abstractmethod 装饰器强制子类实现方法。配合 collections.abc 做鸭子类型检查。' },
      { name: 'inspect', description: '运行时类型与源码检查。获取函数签名、源码行、类继承链、栈帧信息。常用于框架开发、调试工具和反射操作。' },
    ],
  },
  {
    category: '网络通信',
    color: '#EF4444',
    modules: [
      {
        name: 'socket', description: '底层网络编程接口（BSD Socket API），支持 TCP/UDP/Unix Socket。Python 所有网络通信的基础，高层模块（http、smtplib）均构建于其上。',
        detail: '地址族：AF_INET(IPv4)、AF_INET6(IPv6)、AF_UNIX(本机进程间通信)。套接字类型：SOCK_STREAM(TCP)、SOCK_DGRAM(UDP)。\n\n高级用法：select/poll/epoll I/O 多路复用；ssl 包装加密。',
        example: 's = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.connect(("example.com", 80))\ns.send(b"GET / HTTP/1.0\\r\\n\\r\\n")\ndata = s.recv(4096)\ns.close()\n\ngethostbyname("example.com")          # DNS解析',
      },
      { name: 'ssl', description: 'TLS/SSL 安全通信封装，为 socket 提供加密传输。wrap_socket() 包装普通 socket 为 TLS 连接，支持证书验证和双向认证。' },
      {
        name: 'urllib', description: 'URL 处理工具集，request 发 HTTP 请求、parse 解析和构造 URL、error 异常类、robotparser 解析 robots.txt。标准库自带 HTTP 客户端。',
        detail: 'urllib 是标准库无需安装，但 API 较底层。简单脚本够用，复杂场景推荐 requests 第三方库。\n\nurlopen() 返回类文件对象需 .read().decode()；POST 的 data 必须先 encode() 为 bytes。',
        example: 'from urllib import request, parse\nresp = request.urlopen("https://api.github.com")\nparse.urlparse("https://example.com/path?q=1#frag")\nparse.urlencode({"q":"python","page":1})  # q=python&page=1',
      },
      { name: 'http', description: 'HTTP 协议相关模块集，包含 client（HTTP 客户端）、server（HTTP 服务端）、cookies（Cookie 处理）、cookiejar（Cookie 持久化）。' },
      {
        name: 'email', description: '邮件消息构建与解析。MIMEText 纯文本邮件、MIMEImage/MIMEAudio 附件、MIMEMultipart 组合部分。配合 smtplib 发送邮件。',
        detail: 'email.parser 从原始邮件文本解析；email.policy 控制编码策略。MIMEMultipart("alternative") 可同时包含纯文本和 HTML 版本。',
      },
    ],
  },
  {
    category: '开发与调试',
    color: '#64748B',
    modules: [
      {
        name: 'logging', description: 'Python 标准日志系统，多级别（DEBUG/INFO/WARNING/ERROR/CRITICAL）、多处理器（控制台/文件/网络/轮转）、格式化输出。告别 print 调试。',
        detail: 'Logger 日志记录器、Handler 处理器（输出目标）、Formatter 格式化器、Filter 过滤器。\n\n最佳实践：每个模块 logger = logging.getLogger(__name__)；库代码不用 basicConfig；异常用 logger.exception()；敏感信息脱敏。',
        example: 'logging.basicConfig(\n    level=logging.INFO,\n    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"\n)\nlogger = logging.getLogger(__name__)\nlogger.info("消息")\nlogger.error("错误", exc_info=True)  # 含堆栈',
      },
      { name: 'unittest', description: '单元测试框架，xUnit 风格。TestCase 类 + assert 方法、TestSuite 组合、TestRunner 运行、mock 对象模拟。保障代码质量的基础设施。' },
      {
        name: 'argparse', description: '命令行参数解析器，自动生成帮助信息、类型转换、参数验证。支持位置参数、可选参数（--flag）、互斥组、子命令。CLI 工具开发标配。',
        example: 'parser = argparse.ArgumentParser(description="工具描述")\nparser.add_argument("input", help="输入文件")\nparser.add_argument("-o", "--output", default="out.txt")\nparser.add_argument("-v", "--verbose", action="store_true")\nargs = parser.parse_args()',
      },
      { name: 'traceback', description: '异常堆栈跟踪格式化。format_exc() 获取当前异常格式化字符串；extract_tb() 提取堆栈帧信息；print_exc() 打印异常到 stderr。' },
      { name: 'pdb', description: 'Python 调试器，支持断点（breakpoint() / pdb.set_trace()）、单步执行（next/step）、查看变量（print/p）、进入交互式调试。' },
      {
        name: 'warnings', description: '警告消息控制，用于提示非致命问题（废弃 API、可疑用法）。支持过滤（ignore/error/once）、转为异常、记录日志。库作者通知用户升级的推荐方式。',
        detail: '内置类别：UserWarning（默认）、DeprecationWarning（开发者关注）、FutureWarning（终端用户关注）、SyntaxWarning 等。\n\n过滤：warnings.filterwarnings("error") 将警告转为异常。DeprecationWarning 默认被隐藏，需 -Wd 参数。',
      },
      { name: 'configparser', description: 'INI 风格配置文件解析器。支持节（section）、键值对、插值替换（%(var)s）、默认值。适合简单应用的配置文件管理。' },
    ],
  },
  {
    category: '安全与加密',
    color: '#EAB308',
    modules: [
      {
        name: 'hashlib', description: '密码学哈希算法库，支持 MD5、SHA-1、SHA-256/512、SHA-3、BLAKE2。用于数据完整性校验、密码存储（加盐迭代）、文件指纹。',
        detail: 'SHA-256 是当前主流；MD5/SHA-1 仅用于非安全场景（文件去重）。pbkdf2_hmac 和 scrypt 用于密码存储。分块 update() 处理大文件避免 OOM。\n\n⚠️ 不要直接哈希密码！使用 pbkdf2_hmac(password, salt, iterations) 加盐迭代。',
        example: 'hashlib.sha256(b"hello").hexdigest()     # SHA-256\nhashlib.md5(b"hello").hexdigest()         # MD5（不推荐安全场景）\nh = hashlib.sha256()\nh.update(b"hello "); h.update(b"world")    # 分块更新\nhashlib.pbkdf2_hmac("sha256", pw, salt, 100000)',
      },
      {
        name: 'hmac', description: '基于哈希的消息认证码（HMAC），验证消息完整性和真实性。常用于 API 请求签名、Webhook 验证、JWT 的 HS256 算法。',
        detail: '原理：HMAC(key, msg, hash_func)。拥有密钥才能生成和验证。compare_digest() 恒定时间比较防时序攻击。密钥至少 128 位。',
        example: 'h = hmac.new(key, msg, digestmod=hashlib.sha256)\nh.hexdigest()                        # 消息认证码\nhmac.compare_digest(h.hexdigest(), received_signature)\n# Python 3.7+ 简化写法\nhmac.digest(key, msg, digest="sha256")',
      },
      {
        name: 'secrets', description: '密码学安全的随机数生成（Python 3.6+），适用于 token、密码、Session ID 等安全敏感场景。比 random 慢但使用操作系统真随机源。',
        detail: 'token_hex(16) 生成 32 字符十六进制 token；token_urlsafe(16) URL 安全随机串。secrets vs random：random 伪随机可预测，secrets 真随机不可预测。',
        example: 'secrets.token_hex(16)               # 32字符随机token\nsecrets.token_urlsafe(16)           # URL安全base64\nsecrets.choice(["a","b","c"])       # 安全随机选择\nsecrets.compare_digest(a, b)        # 恒定时间比较',
      },
      {
        name: 'uuid', description: '通用唯一标识符（UUID）生成。uuid4() 随机 UUID（最常用）、uuid1() 基于时间+MAC、uuid3/5() 基于命名空间+名称的确定性 UUID。',
        example: 'uuid.uuid4()                          # 随机UUID\nuuid.uuid4().hex                      # 32字符十六进制\nuuid.uuid5(uuid.NAMESPACE_DNS, "example.com")  # 确定性UUID',
      },
    ],
  },
  {
    category: '其他实用工具',
    color: '#14B8A6',
    modules: [
      {
        name: 'collections', description: '高级容器数据类型。Counter（计数器）、defaultdict（带默认值字典）、deque（双端队列）、OrderedDict、ChainMap、namedtuple。',
        detail: 'Counter 统计频率 + most_common()；defaultdict 避免 KeyError 检查；deque O(1) 两端操作适合队列/栈/滑动窗口；namedtuple 轻量不可变数据类。\n\n选择指南：统计频率→Counter，分组聚合→defaultdict(list)，LRU缓存→deque。',
        example: 'Counter("abracadabra")                # {"a":5,"b":2,...}\nCounter(lst).most_common(2)           # 最高频2项\nd = defaultdict(list)\nd["a"].append(1)                       # 不存在的key自动创建list\ndq = deque([1,2,3], maxlen=10)         # 固定长度队列',
      },
      {
        name: 'copy', description: '浅拷贝（copy）和深拷贝（deepcopy）。浅拷贝仅复制容器本身（内部元素引用共享），深拷贝递归复制整个对象图。',
        detail: '赋值=：别名，两个变量指向同对象。浅拷贝：新容器对象但内部元素共享。深拷贝：完全独立的递归副本。\n\n循环引用通过 memo 字典处理。不可变类型（int/str/tuple）拷贝直接返回原对象。',
        example: 'shallow = copy.copy(original)          # 浅拷贝\ndeep = copy.deepcopy(original)          # 深拷贝\n# list(dict/set) 的 [:] 等价于浅拷贝',
      },
      {
        name: 'contextlib', description: '上下文管理器辅助工具。@contextmanager 装饰器用生成器快速定义上下文、redirect_stdout 重定向输出、suppress 优雅忽略异常、ExitStack 动态管理多个上下文。',
        detail: '核心工具：@contextmanager 一行装饰器 + yield 即可创建上下文管理器（无需定义 __enter__/__exit__ 类）；closing() 为任意对象添加 close() 调用；suppress(*exceptions) 比 try/except pass 更清晰；redirect_stdout/stderr 临时重定向标准输出；ExitStack 动态管理数量不定的上下文。\n\n实用场景：计时器、临时环境变量、临时工作目录、资源批量清理。',
        example: '@contextmanager\ndef timer():\n    start = time.time()\n    yield                       # yield前=__enter__，后=__exit__\n    print(f"耗时{time.time()-start:.2f}s")\n\nwith open("out.log","w") as f:\n    with redirect_stdout(f):    # print 输出到文件\n        print("写入文件")\n\nsuppress(FileNotFoundError)      # 优雅忽略异常',
      },
      { name: 'weakref', description: '弱引用，不增加对象引用计数。用于缓存、观察者模式等场景，避免循环引用导致内存泄漏。WeakValueDictionary 自动清理已回收的对象。' },
      {
        name: 're', description: '正则表达式引擎，基于 Perl 风格语法。提供模式匹配、查找（findall/search/match）、替换（sub）、分割（split）。文本处理最强大的工具之一。',
        detail: 'search 搜索首次匹配；match 仅从开头匹配；findall 返回全部；finditer 返回迭代器省内存；sub 替换；compile 预编译提升重复使用性能。\n\n常用标志：re.I 忽略大小写、re.M 多行、re.S dotAll、re.X 详细模式（允许注释）。',
        example: 're.findall(r"\\d+", text)             # 查找所有数字\nre.search(r"pattern", text)            # 搜索首次匹配\nre.sub(r"\\d+", "#", text)             # 替换\nre.split(r"[,;]", text)               # 多分隔符分割\nre.compile(r"\\d+")                     # 预编译高效',
      },
      { name: 'textwrap', description: '文本换行与格式化。fill/wrap 按宽度自动换行；dedent 清除公共缩进；indent 加前缀；shorten 截断加省略号。' },
      { name: 'fnmatch', description: 'Unix shell 风格通配符匹配（非文件系统）。fnmatch("file.txt", "*.txt") 判断文件名是否匹配模式。底层用于 glob 模块。' },
    ],
  },
]

// --- 必学模块数据 ---
const essentialModuleGroups: ModuleGroup[] = [
  {
    category: '核心必备',
    color: '#F59E0B',
    modules: [
      {
        name: 'os', description: '操作系统交互核心。路径拼接、环境变量、文件遍历、进程管理。跨平台兼容 Windows/Linux/macOS，每个 Python 脚本几乎都会用到。',
        detail: '文件操作：mkdir/remove/rename/listdir/walk；环境变量：environ.get()；路径：os.path.join/basename/splitext。\n\n现代代码中路径操作推荐用 pathlib 替代 os.path。',
        example: 'os.getcwd() / os.listdir(".")\nos.environ.get("HOME")\nos.path.join("dir", "file.txt")\nos.walk("dir")  # 递归遍历',
      },
      {
        name: 'sys', description: '解释器控制枢纽。sys.argv 获取命令行参数、sys.path 管理导入路径、sys.exit 退出程序、sys.stdin/stdout 标准流操作。',
        detail: 'sys.argv 是 CLI 工具接收参数的入口；sys.path.append() 动态添加模块搜索路径；sys.getsizeof() 查看内存占用；sys.version 获取版本信息。',
        example: 'sys.argv           # ["script.py", "arg1", "arg2"]\nsys.path           # 模块搜索路径列表\nsys.exit(0)        # 正常退出',
      },
      {
        name: 'pathlib', description: '现代化路径操作（Python 3.4+），推荐优先使用。Path 对象用 / 拼接路径，read_text/write_text 一行读写文件，glob 递归搜索。',
        example: 'Path("data/file.txt").read_text()\nPath.home() / "project" / "src"\nfor f in Path(".").glob("**/*.py"):\n    print(f)',
      },
      {
        name: 'datetime', description: '日期时间处理核心。datetime.now() 当前时间、strftime/strptime 格式化解析、timedelta 时间差运算。配合 zoneinfo 处理时区。',
        example: 'now = datetime.now()\nnow.strftime("%Y-%m-%d %H:%M:%S")\ndatetime.strptime("2024-01-01", "%Y-%m-%d")\nnow + timedelta(days=30)',
      },
      {
        name: 'json', description: 'JSON 序列化，Web API 与配置文件的事实标准。dumps/loads 字符串编解码，dump/load 文件读写。indent 参数美化输出。',
        example: 'data = json.loads(\'{"name":"Alice","age":25}\')\njson.dumps(data, indent=2, ensure_ascii=False)\nwith open("config.json") as f:\n    config = json.load(f)',
      },
      {
        name: 're', description: '正则表达式文本处理利器。findall 查找全部、search 搜索、sub 替换、split 分割。文本清洗与验证的首选工具。',
        example: 're.findall(r"\\d+", "a1b2c3")  # ["1","2","3"]\nre.search(r"\\d{4}-\\d{2}-\\d{2}", date_str)\nre.sub(r"\\s+", " ", text)        # 合并空白\nre.split(r"[,;]", "a,b;c")       # ["a","b","c"]',
      },
      {
        name: 'collections', description: '高效数据结构工具箱。Counter 统计频率、defaultdict 带默认值、deque 双端队列、namedtuple 轻量类。数据处理效率倍增器。',
        example: 'Counter("mississippi").most_common(2)  # [("i",4),("s",4)]\ngroups = defaultdict(list)\nfor item in items:\n    groups[item.type].append(item)\ndq = deque(maxlen=100)  # 固定窗口',
      },
      {
        name: 'functools', description: '高阶函数增强。@lru_cache 缓存递归结果、partial 预设参数、reduce 累积归约、@wraps 保留装饰器元信息。',
        example: '@lru_cache(maxsize=256)\ndef fibonacci(n): ...\n\nsort_by_age = partial(sorted, key=lambda x: x.age)\nresult = reduce(operator.mul, [1,2,3,4])  # 24',
      },
      {
        name: 'itertools', description: '迭代器组合工厂。chain 串联、product 笛卡尔积、permutations/combinations 排列组合、groupby 分组、islice 惰性切片。',
        example: 'itertools.chain("ABC", "123")  # A B C 1 2 3\nitertools.product("AB", [1,2])   # (A,1),(A,2),(B,1),(B,2)\nfor k, g in groupby(data, key=func): ...',
      },
      {
        name: 'typing', description: '类型注解支持。提升代码可读性、IDE 智能提示、静态类型检查。List/Dict/Optional/Union/Protocol，3.10+ 用 X|Y 替代 Union。',
        example: 'def process(items: list[str]) -> dict[str, int]:\n    return {item: len(item) for item in items}\n\nfrom typing import Optional, Protocol\nname: Optional[str] = None  # str | None',
      },
    ],
  },
  {
    category: '工程必备',
    color: '#3B82F6',
    modules: [
      {
        name: 'logging', description: '日志系统，生产环境必备。分级输出（DEBUG→CRITICAL）、写入文件/控制台/网络、自动轮转、格式化时间戳。彻底告别 print 调试。',
        detail: '模块级 Logger = logging.getLogger(__name__)；basicConfig 快速配置；RotatingFileHandler 按大小轮转；TimedRotatingFileHandler 按时间轮转。\n\n生产环境：INFO 控制台 + ERROR 文件 + 定时轮转 + 日志脱敏。',
        example: 'logging.basicConfig(level=logging.INFO,\n    format="%(asctime)s [%(levelname)s] %(message)s")\nlogger = logging.getLogger(__name__)\nlogger.info("服务启动")\nlogger.exception("异常详情")  # 自动含堆栈',
      },
      {
        name: 'argparse', description: '命令行工具开发标配。自动生成 --help、参数类型转换、必填校验、互斥组、子命令。比手动解析 sys.argv 专业百倍。',
        example: 'parser = argparse.ArgumentParser()\nparser.add_argument("files", nargs="+", help="输入文件")\nparser.add_argument("-o", "--output", required=True)\nparser.add_argument("-n", type=int, default=1)\nargs = parser.parse_args()\nprint(args.files, args.output)',
      },
      {
        name: 'unittest', description: '单元测试框架。TestCase 定义测试、assertEqual/assertRaises 断言、setUp/tearDown 前后置、mock 模拟依赖。代码质量的底线保障。',
        example: 'class TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(1, 2), 3)\n\n    def test_raises(self):\n        with self.assertRaises(ValueError):\n            divide(1, 0)\n\nunittest.main()',
      },
      {
        name: 'subprocess', description: '调用外部命令和脚本的核心。自动化部署、构建脚本、系统管理的基础。run() 推荐接口，支持超时、输出捕获、环境变量注入。',
        example: 'result = subprocess.run(\n    ["git", "status"],\n    capture_output=True, text=True, timeout=10\n)\nprint(result.stdout)\nif result.returncode != 0:\n    print(result.stderr)',
      },
      {
        name: 'shutil', description: '文件批量操作工具箱。复制目录树、创建/解压归档、递归删除。自动化脚本和部署工具中的文件管理利器。',
        example: 'shutil.copytree("src", "backup/src")\nshutil.make_archive("release", "zip", "dist/")\nshutil.rmtree("temp/")  # 危险！需确认\nshutil.disk_usage("/")   # 查看磁盘空间',
      },
      {
        name: 'copy', description: '理解 Python 对象引用模型的关键。浅拷贝 vs 深拷贝的区别是面试和实际开发的必考知识点。处理嵌套可变对象时必须理解。',
        example: 'import copy\n# 浅拷贝：新容器，内部元素共享\nnew = copy.copy(original)\n# 深拷贝：完全独立副本\ndeep = copy.deepcopy(nested_obj)',
      },
    ],
  },
  {
    category: '进阶核心',
    color: '#8B5CF6',
    modules: [
      {
        name: 'asyncio', description: '异步编程核心框架。用 async/await 语法编写高并发网络服务，单线程处理成千上万连接。Web 框架（FastAPI）和爬虫（aiohttp）的底层引擎。',
        detail: '核心概念：事件循环（Event Loop）调度协程执行。gather() 并发等待；create_task() 后台任务；Queue 异步生产者-消费者。\n\n学习曲线较陡但收益巨大，是高并发 Python 服务的基石。',
        example: 'async def fetch(url):\n    async with aiohttp.ClientSession() as s:\n        async with s.get(url) as r:\n            return await r.text()\n\nasync def main():\n    results = await asyncio.gather(\n        fetch(url1), fetch(url2))\nasyncio.run(main())',
      },
      {
        name: 'dataclasses', description: '消除样板代码的数据类。@dataclass 装饰器自动生成 __init__/__repr__/__eq__。frozen=True 创建不可变对象，field() 精细控制默认值和比较。',
        example: '@dataclass\nclass User:\n    name: str\n    age: int = 0\n    tags: list = field(default_factory=list)\n\n@dataclass(frozen=True)  # 不可变，可哈希\nclass Point:\n    x: float\n    y: float',
      },
      {
        name: 'enum', description: '枚举类型，用命名常量替代魔术字符串/数字。提高代码可读性和类型安全。配合 match-case 写出优雅的状态机代码。',
        example: 'class OrderStatus(Enum):\n    PENDING = "pending"\n    SHIPPED = "shipped"\n    DELIVERED = "delivered"\n\nmatch status:\n    case OrderStatus.PENDING: ...\n    case OrderStatus.SHIPPED: ...',
      },
      {
        name: 'math', description: '数学函数库。sqrt 平方根、pow 幂运算、三角函数、对数指数、ceil/floor 取整、gcd/lcm 公约公倍数。常量和特殊函数一并提供。',
        example: 'math.sqrt(16)    # 4.0\nmath.ceil(3.1)    # 4\nmath.floor(3.9)   # 3\nmath.gcd(24, 36)  # 12\nmath.comb(10, 2)  # 45 组合数\nmath.pi           # 3.141592653589793',
      },
      { name: 'random', description: '随机数生成。randint 整数、choice 选择、sample 抽样、shuffle 洗牌、choices 加权随机。模拟、游戏、数据增强的必需品。⚠️ 安全场景用 secrets。' },
      {
        name: 'decimal', description: '精确十进制运算。Decimal("0.1") + Decimal("0.2") == Decimal("0.3") 精确成立。金融和货币计算必用，避免浮点误差。',
        detail: 'getcontext().prec 设置精度（默认28位）；quantize() 按指定位数舍入。支持 ROUND_HALF_UP（四舍五入）、ROUND_DOWN（截断）等舍入模式。\n\n性能比 float 慢约 100 倍，仅在需要精确计算的场景使用。',
        example: 'from decimal import Decimal, getcontext\ngetcontext().prec = 4\nprice = Decimal("19.99")\ntax = Decimal("0.08")\ntotal = price * (1 + tax)  # Decimal("21.59")',
      },
    ],
  },
  {
    category: '数据处理必备',
    color: '#10B981',
    modules: [
      {
        name: 'csv', description: '表格数据读写。数据分析、ETL 管道、Excel 导出导入的基础。DictReader/DictWriter 按列名操作避免索引错误。',
        example: 'with open("data.csv", newline="") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["age"])\n\nwriter = csv.DictWriter(f, fieldnames=["name","age"])\nwriter.writeheader()\nwriter.writerows(data)',
      },
      {
        name: 'hashlib', description: '哈希摘要引擎。SHA-256 数据指纹、文件完整性校验、pbkdf2_hmac 密码存储。安全敏感场景的基础模块。',
        example: '# 文件SHA256\nh = hashlib.sha256()\nfor chunk in iter(lambda: f.read(4096), b""):\n    h.update(chunk)\nchecksum = h.hexdigest()\n\n# 密码哈希（推荐）\nhashlib.pbkdf2_hmac("sha256", password, salt, 100_000)',
      },
      {
        name: 'uuid', description: '唯一 ID 生成器。uuid4() 随机 UUID 用作数据库主键、请求追踪 ID、文件名去重。分布式系统中生成全局唯一标识的首选。',
        example: 'user_id = str(uuid.uuid4())\n# "a3f2b8c1-9d4e-5f6a-8b7c-0d1e2f3a4b5c"\n\nrequest_id = uuid.uuid4().hex\n# "a3f2b8c19d4e5f6a8b7c0d1e2f3a4b5c"',
      },
      {
        name: 'sqlite3', description: '嵌入式关系数据库。零配置、零依赖、一个文件就是整个数据库。原型开发、桌面应用、单机测试的首选存储方案。',
        detail: '支持完整 SQL 语法、事务（BEGIN/COMMIT/ROLLBACK）、参数化查询（防SQL注入）、自定义函数。Row 工厂返回字典式行对象。\n\n生产环境大数据量时迁移到 PostgreSQL/MySQL。',
        example: 'conn = sqlite3.connect("app.db")\nconn.row_factory = sqlite3.Row\nconn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")\nconn.execute("INSERT INTO users (name) VALUES (?)", ("Alice",))\nconn.commit()',
      },
      { name: 'tempfile', description: '临时文件管理。自动化测试、中间文件处理、安全下载缓冲。上下文管理器自动清理，无需手动追踪文件生命周期。' },
      { name: 'glob', description: '文件模式匹配。批量查找和处理文件的首选方法。glob("**/*.py", recursive=True) 递归搜索所有 Python 文件。配合其他模块批量操作。' },
    ],
  },
]

// --- 魔术方法数据 ---
const magicMethodGroups: MagicMethodGroup[] = [
  {
    category: '对象生命周期',
    color: '#3B82F6',
    methods: [
      { name: '__init__', description: '构造方法，实例化对象时调用。初始化实例属性，不应返回除 None 外的值。' },
      { name: '__new__', description: '创建实例，在 __init__ 之前调用。控制对象创建过程，实现单例模式的关键。用于继承不可变类型。' },
      { name: '__del__', description: '析构方法，对象被垃圾回收时调用。不应依赖此方法做关键清理，用 with 语句和上下文管理器更可靠。' },
    ],
  },
  {
    category: '字符串表示',
    color: '#8B5CF6',
    methods: [
      { name: '__str__', description: '用户友好字符串表示，print() 和 str() 调用。面向终端用户的可读输出。' },
      { name: '__repr__', description: '开发者调试字符串表示，repr() 调用。理想情况下应可被 eval() 还原。面向开发者的精确表示。' },
      { name: '__format__', description: '格式化字符串，format() 和 f-string 调用。支持 :.2f 等格式规范。' },
      { name: '__bytes__', description: '转为字节序列，bytes() 调用。定义对象的二进制表示。' },
      { name: '__fspath__', description: '返回文件系统路径，os.fspath() 调用。使对象可用于需要路径的函数。' },
    ],
  },
  {
    category: '容器与迭代',
    color: '#10B981',
    methods: [
      { name: '__len__', description: '返回容器长度，len() 调用。应返回非负整数。' },
      { name: '__getitem__', description: '索引访问，obj[key] 取值。支持整数索引和切片对象。' },
      { name: '__setitem__', description: '索引赋值，obj[key] = value。实现可变容器的写操作。' },
      { name: '__delitem__', description: '索引删除，del obj[key]。删除容器中的元素。' },
      { name: '__contains__', description: '成员检测，in / not in 运算符。应返回布尔值。' },
      { name: '__missing__', description: 'dict 子类中键缺失时调用的钩子方法。实现 defaultdict 的核心机制。' },
      { name: '__iter__', description: '返回迭代器对象，for 循环和 iter() 调用。容器类实现此方法即可迭代。' },
      { name: '__next__', description: '返回迭代器下一项，next() 调用。耗尽时抛出 StopIteration 异常。' },
      { name: '__reversed__', description: '反向迭代支持，reversed() 调用。返回反向迭代器。' },
      { name: '__length_hint__', description: '预估迭代器剩余长度，用于优化内存预分配。非强制性，返回值仅作提示。' },
    ],
  },
  {
    category: '属性访问',
    color: '#F59E0B',
    methods: [
      { name: '__getattr__', description: '访问不存在的属性时调用（兜底机制）。仅在常规查找失败后触发。' },
      { name: '__getattribute__', description: '访问任意属性时无条件调用（拦截所有访问）。谨慎使用，易导致无限递归。' },
      { name: '__setattr__', description: '设置属性值时调用，obj.attr = value。可在此添加验证逻辑。' },
      { name: '__delattr__', description: '删除属性时调用，del obj.attr。控制属性删除行为。' },
      { name: '__dir__', description: '控制 dir() 返回的属性列表。可隐藏或添加属性名。' },
    ],
  },
  {
    category: '比较运算符',
    color: '#EC4899',
    methods: [
      { name: '__eq__', description: '相等比较 ==。默认实现基于对象标识（is），通常需重写为值比较。' },
      { name: '__ne__', description: '不等比较 !=。默认委托给 __eq__ 取反，通常无需单独实现。' },
      { name: '__lt__', description: '小于比较 <。实现排序支持的关键方法之一。' },
      { name: '__le__', description: '小于等于比较 <=。配合 __lt__ 和 __eq__ 实现。' },
      { name: '__gt__', description: '大于比较 >。functools.total_ordering 可从 __lt__ 和 __eq__ 自动推导。' },
      { name: '__ge__', description: '大于等于比较 >=。' },
      { name: '__hash__', description: '返回哈希值，使对象可作为 dict 键和 set 元素。自定义 __eq__ 时需同步实现 __hash__ 或设为不可哈希。' },
    ],
  },
  {
    category: '算术运算符',
    color: '#06B6D4',
    methods: [
      { name: '__add__', description: '加法 +。t1 + t2 触发 t1.__add__(t2)。' },
      { name: '__sub__', description: '减法 -。' },
      { name: '__mul__', description: '乘法 *。' },
      { name: '__truediv__', description: '真除法 /。返回浮点结果，from __future__ import division 行为。' },
      { name: '__floordiv__', description: '整除 //。向下取整除法，如 7 // 2 = 3。' },
      { name: '__mod__', description: '取模 %。求余数操作。' },
      { name: '__pow__', description: '幂运算 **。pow(a, b) 等价于 a ** b。' },
      { name: '__divmod__', description: 'divmod() 调用。返回 (商, 余数) 元组。' },
      { name: '__matmul__', description: '矩阵乘法 @。Python 3.5+ 新增，numpy 数组常用。' },
      { name: '__radd__', description: '反射加法。左操作数不支持 __add__ 时，尝试右操作数的 __radd__。' },
      { name: '__rsub__', description: '反射减法。' },
      { name: '__rmul__', description: '反射乘法。' },
      { name: '__rtruediv__', description: '反射真除法。' },
      { name: '__iadd__', description: '增强赋值 +=。应返回 self 以支持链式赋值，对不可变类型返回新对象。' },
      { name: '__isub__', description: '增强赋值 -=。' },
      { name: '__imul__', description: '增强赋值 *=。' },
    ],
  },
  {
    category: '位运算符',
    color: '#EF4444',
    methods: [
      { name: '__and__', description: '按位与 &。' },
      { name: '__or__', description: '按位或 |。' },
      { name: '__xor__', description: '按位异或 ^。' },
      { name: '__lshift__', description: '左移 <<。' },
      { name: '__rshift__', description: '右移 >>。' },
      { name: '__invert__', description: '按位取反 ~。' },
      { name: '__rand__', description: '反射按位与。' },
      { name: '__ror__', description: '反射按位或。' },
      { name: '__rxor__', description: '反射按位异或。' },
    ],
  },
  {
    category: '一元运算符',
    color: '#6366F1',
    methods: [
      { name: '__neg__', description: '一元负号 -obj。' },
      { name: '__pos__', description: '一元正号 +obj。' },
      { name: '__abs__', description: '绝对值 abs(obj)。' },
    ],
  },
  {
    category: '类型转换',
    color: '#14B8A6',
    methods: [
      { name: '__int__', description: '转为整数 int(obj)。' },
      { name: '__float__', description: '转为浮点数 float(obj)。' },
      { name: '__complex__', description: '转为复数 complex(obj)。' },
      { name: '__bool__', description: '布尔判断 bool(obj)，控制 if 条件语句的真值测试。' },
      { name: '__index__', description: '无损整数转换，用于切片、索引和 bin/oct/hex 等函数。必须返回 int。' },
      { name: '__round__', description: '四舍五入 round(obj, ndigits)。' },
      { name: '__trunc__', description: '截断取整 math.trunc(obj)。向零方向舍入。' },
      { name: '__floor__', description: '向下取整 math.floor(obj)。' },
      { name: '__ceil__', description: '向上取整 math.ceil(obj)。' },
    ],
  },
  {
    category: '上下文管理',
    color: '#EAB308',
    methods: [
      { name: '__enter__', description: '进入 with 块时调用，返回资源句柄（通常是 self）。' },
      { name: '__exit__', description: '退出 with 块时调用，处理异常与清理资源。返回 True 可抑制异常。' },
      { name: '__aenter__', description: '异步上下文管理器 async with 进入。返回 awaitable 对象。' },
      { name: '__aexit__', description: '异步上下文管理器 async with 退出。' },
    ],
  },
  {
    category: '可调用与序列化',
    color: '#64748B',
    methods: [
      { name: '__call__', description: '使实例可调用，obj() 触发。将对象变为类似函数的可调用体。' },
      { name: '__copy__', description: '浅拷贝钩子，copy.copy() 调用。自定义浅拷贝行为。' },
      { name: '__deepcopy__', description: '深拷贝钩子，copy.deepcopy() 调用。memo 字典处理循环引用。' },
      { name: '__getstate__', description: 'pickle 序列化时获取对象状态。返回可序列化的状态对象。' },
      { name: '__setstate__', description: 'pickle 反序列化时恢复对象状态。接收 __getstate__ 返回的数据。' },
      { name: '__reduce__', description: '自定义 pickle 序列化协议。返回 (callable, args) 用于重建对象。' },
      { name: '__reduce_ex__', description: '协议版本感知的序列化。根据 protocol 参数选择序列化策略。' },
      { name: '__sizeof__', description: '返回对象内存占用大小（字节）。sys.getsizeof() 内部调用。' },
    ],
  },
  {
    category: '类元编程',
    color: '#0EA5E9',
    methods: [
      { name: '__init_subclass__', description: '子类被创建时自动调用。用于注册子类或为子类添加默认行为。' },
      { name: '__set_name__', description: '描述符被赋值给类属性时通知其属性名称。描述符协议的一部分。' },
      { name: '__class_getitem__', description: '泛型类参数化，如 list[int]。实现 [] 下标在类上的使用。' },
      { name: '__prepare__', description: '元类创建命名空间前的预处理。可自定义命名空间为 OrderedDict 等。' },
      { name: '__subclasshook__', description: '自定义 issubclass() 检查逻辑。实现抽象基类的虚拟子类机制。' },
      { name: '__instancecheck__', description: '自定义 isinstance() 检查逻辑。在元类上定义。' },
      { name: '__subclasscheck__', description: '自定义子类判断逻辑。在元类上定义。' },
    ],
  },
]
</script>

<style scoped>
code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', monospace;
}
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
