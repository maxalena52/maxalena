var e=`Lola has a filthy mouth and no patience for bullshit. After the Grim Reaper accidentally kills her and she awakens inside the novel she hated most, she decides that living quietly is not an option. But the harder she fights the story, the more she begins to realise that she may not control its plot as completely as she believed.`;function t(e){return e?e.replace(/\u00a0/g,` `).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).replace(/the kingdoms most dangerous fixer/gi,`the kingdom’s most dangerous Fixer`).replace(/the only difference this is is that/gi,`the only difference is that`).trim():``}function n(n,r){let i=n.trim().toLowerCase();if(i.startsWith(`lola daffodil`))return e;if(i===`cassius thornwood`)return`Cassius Thornwood is the kingdom’s most dangerous Fixer—a hunter tasked with eradicating the witches he has been taught to regard as pests. His certainty begins to fracture when he encounters Grace, the only witch he fails to kill.`;let a=t(r);return a.toLowerCase().includes(`dirty mouth who isn't afraid`)||a.toLowerCase().includes(`dirty mouth who isn’t afraid`)?e:(a.includes(`the only difference this is is`)&&(a=a.replace(/He is every bit the antagonist a novel hero needs, the only difference this is is that the hero he is antagonizing happens to be the woman he is slowly falling in love with\./i,`He is every bit the antagonist a novel hero needs—except the hero he is opposing is the woman he is slowly falling in love with.`)),a)}function r(e){return e.toLowerCase().startsWith(`lola daffodil`)?`Lola Daffodil`:e.includes(`Raphael Grimwraith`)?`Raphael Grimwraith`:e.trim()}function i(e,t,n){let r=`${e} ${(t||[]).join(` `)}`.toLowerCase();return r.includes(`professor`)||r.includes(`contemporary`)||r.includes(`ceo`)||r.includes(`corporate`)?`Contemporary forbidden romance`:r.includes(`grim reaper`)||r.includes(`mythology`)||r.includes(`transmigrat`)?`Dark fantasy romance`:r.includes(`witch`)||r.includes(`dragon`)||r.includes(`supernatural`)||r.includes(`war`)?`Romantasy`:(n||``).includes(`ongoing`)?`Serialised romantasy`:`Dark romance`}var a=`An acquired taste. A questionable influence. An excellent distraction.

Maxalena has a particular fascination with desire, power, temptation, and the wonderfully inconvenient things people do when good judgment abandons them.

She writes for the curious, the unashamed, and those whose reading habits are considerably less innocent than their public personalities suggest.

Her stories wander between sensual romance, dangerous obsessions, morally complicated characters, dark fantasy, and deliciously questionable circumstances. She enjoys intelligent seduction, wicked humour, beautiful villains, formidable women, and men whose composure is worth dismantling.

She believes intimacy deserves as much literary attention as tragedy, that pleasure need not apologise for its existence, and that a perfectly respectable imagination is a terribly underutilised one.

As for the woman behind the words, Maxalena prefers to remain an unreliable narrator of her own existence. She might tell you something about herself over a glass of wine, but whether it is a confession, an embellishment, or the beginning of another novel is entirely your problem.

Some things are better left to the imagination.

She writes what you pretend not to read.`;export{i as a,t as i,r as n,n as r,a as t};