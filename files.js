export function listFiles() {
  const guide = new File(
    [
      `The objective is to significantly improve this file browser. Features to think about include: a text editor, markdown and code previews, or file changes persisting across reloads.

Install any npm packages or use any third party code you'd like, but please make sure it is clear when you do so.

Once complete, send us a forked GitHub repo link.

Thanks for trying our challenge!

- Corsali Engineering
`
    ],
    '/README.txt',
    {
      type: 'text/plain',
      lastModified: new Date('2020-01-05T16:39:00')
    }
  );

  const plain = new File(
    ['Just some text looking for an editor'],
    '/plain.txt',
    {
      type: 'text/plain',
      lastModified: new Date('1995-12-17T03:24:00')
    }
  );

  const water = new File(
    [
      'Increasing water scarcity is an extremely dangerous symptom of a warming planet. The World Health Organization estimates that half of the global population will live in water-stressed areas by 2025. In 2008, the CEO of DOW Chemical said, “Water is the oil of the 21st century.” There have been 9 major conflicts over oil since 1932.'
    ],
    '/water.txt',
    {
      type: 'text/plain',
      lastModified: new Date('1998-12-17T04:24:00')
    }
  );

  // Here is a markdown file
  const fancy = new File(
    [
      `# Spargit piget

## Vetustis a visaque vestigia

Lorem markdownum lacrimis sua, nostro lecto Cynthia montes motis formam Vesta
ubi voveo, te. Cedere ut quoque suam quam veniet pietas precesque patitur undis
inplevit in Leucon oraque conlegerat gemit dum qua?

## Iras praetemptatque datur

Plura exsultatque iacit furialibus adit quantumque: vetantis **unda** membra sit
numina. Arte sed rapinae detestatur, et lecti a caligine cum nebulas. Epotus vel
nurusque remissos contigit nudos.

Nervis diva frusta, super, ab famulae maritum: denique faciem in. Lacrimis
lambit et armis procumbit venis. His adsuetudine oculi. Fiat [hoc iecit
trisulcis](http://abit.io/) Acoete scorpius momordit; nomen mors ut bacchae,
bracchia et lecto? Est ferro titubat, sic dumque truncoque auras vetusque duxit!

## Philemon spectans ulvae montes et te lacrimabile

Heres ancipiti, erudit vel plurima navis,; pollice Susurri satos nube honorem
Marte dimovit incommendataque dignabere populisque, quantum. **Post cursus** ceu
*ille*, curae lacrimae Mopsus si gente Thyneius: sed unde oraque concussit?
Pallas es super: iussit cum Aesacon adesset aurum, fatale Panopesque dixit
momentaque undis et quidem nuper currus ferunt. In et usus [semper o
digna](http://www.secutum.com/) Troada, temptant afuit Denique cecidisse huc,
volucres. Prodit ut heres tulisset beati longeque scrobe huc Venerem deum omnes
adventuque.

## Posti potita

Viri mille suo equidem altus. Hoc tibi concipit valet, per habet auras ullas
*nondum* chlamydem turba lacrimaeque committi ut mea secum, nec nubila! Orbus
sive tecti, pars removere ardent vultus tamen obstiterit vellere rector vera?

1. Et duorum
2. Ilicet fessa
3. Causa inque alta existit
4. Vulnera sumimus placerent suisque iam bellicus

## Stellatus opto iubet satis et oculos sacro

Capillos attulit adversaque penetravit sunt Tyrrhenae auras nascentia
[armata](http://pluvialibus.net/), terra. Tepidae oneri sunt obrutus mundi
venere ibat hanc, caedis. Madidisque procul et frustra vulnere haerentes velle
coniugiale fetus demisit.

> Hanc pace faciendus poterit; medioque paviunt. Aer exuit est, pellitis non
> vigor ceu esse nec ingeniis inducta. Ritu tenet sustinet: tua crede veniebat
> flamma tamen tempus et.

Et cursus radices, fidem axes, adflatuque fessa signataque marito ignes esse
clamor. Meus credentes feto quocumque serpentigenis Hersilien se pecudes festam.
Legatur astu circumdata contulerat aevum, percussis inguina subvolat missa.`
    ],
    '/fancy.md',
    {
      type: 'text/markdown',
      lastModified: new Date('2018-09-14T09:32:17')
    }
  );

  const javascript = new File(
    [
      `import { useState, useRef, useEffect } from 'react';

// From: https://blog.castiel.me/posts/2019-02-19-react-hooks-get-current-state-back-to-the-future/

export default initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [state, stateRef, setState];
};`
    ],
    '/use-ref-state.js',
    {
      type: 'text/javascript',
      lastModified: new Date('2019-04-01T12:15:01')
    }
  );

  const json = new File(
    [
      `{
    "name" : "Admin",
    "email" : "admin@neptune.com",
    "rights" : [ "admin", "editor", "contributor" ]
}`
    ],
    '/document.json',
    {
      type: 'application/json',
      lastModified: new Date('2011-07-29T16:01:35')
    }
  );

  return [guide, plain, water, fancy, javascript, json];
}
