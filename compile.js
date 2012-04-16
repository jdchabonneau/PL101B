﻿var endTime = function (time, expr) {
    if (expr.tag === 'note') return time + expr.dur;
    if (expr.tag === 'seq')
        return endTime(endTime(time, expr.left), expr.right);
    return Math.max(endTime(time, expr.left), endTime(time, expr.right));
};

var compileT = function (musexpr, time) {
    if (musexpr.tag === 'note') {
        return [{ tag: 'note',
            pitch: musexpr.pitch,
            start: time,
            dur: musexpr.dur
        }];
    }
    if (musexpr.tag === 'seq') {
        var left = compileT(musexpr.left, time);
        var ldur = endTime(time, musexpr.left);
        var right = compileT(musexpr.right, ldur);
        return left.concat(right);
    }
    if (musexpr.tag === 'par') {
        var left = compileT(musexpr.left, time);
        var right = compileT(musexpr.right, time);
        return left.concat(right);
    }
};

var compile = function (musexpr) {
    return compileT(musexpr, 0);
};

//C:\Program Files (x86)\nodejs;C:\Program Files (x86)\Haskell\bin;C:\Program Files (x86)\Haskell Platform\2011.4.0.0\lib\extralibs\bin;C:\Program Files (x86)\Haskell Platform\2011.4.0.0\bin;C:\Program Files\Common Files\Microsoft Shared\Windows Live;C:\Program Files (x86)\Common Files\Microsoft Shared\Windows Live;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\Windows Live\Shared;c:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\;c:\Program Files\Microsoft SQL Server\100\Tools\Binn\;c:\Program Files\Microsoft SQL Server\100\DTS\Binn\;c:\Program Files (x86)\Microsoft SQL Server\90\Tools\binn\;C:\Program Files (x86)\Microsoft ASP.NET\ASP.NET Web Pages\v1.0\;C:\Program Files\TortoiseSVN\bin;C:\Program Files (x86)\VisualSVN\bin;c:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\VSShell\Common7\IDE\;c:\Program Files (x86)\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files (x86)\QuickTime\QTSystem\;C:\Program Files\Microsoft SQL Server\110\Tools\Binn\;C:\Program Files (x86)\Git\cmd;C:\Users\jack\AppData\Roaming\npm;C:\Program Files (x86)\nodejs\

var melody_mus =
    { tag: 'seq',
        left:
       { tag: 'par',
           left: { tag: 'note', pitch: 'c3', dur: 250 },
           right: { tag: 'note', pitch: 'g4', dur: 500}
       },
        right:
       { tag: 'par',
           left: { tag: 'note', pitch: 'd3', dur: 500 },
           right: { tag: 'note', pitch: 'f4', dur: 250}
       }
    };

console.log(melody_mus);
console.log(compile(melody_mus));