<?php $cobranding = get_cobranding(); ?>

<header class="rui-header rui-clearfix rui-header-shrink">
    <div class="rui-grid rui-header-container">

        <?php if (isset($cobranding['header'])):

            echo $cobranding['header'];

        else: ?>

            <div class="rui-main-logo" itemscope itemtype="http://schema.org/Organization">
              <a itemprop="url" title="realestate.com.au homepage" href="http://www.realestate.com.au/buy">
                <img itemprop="logo" src="//s1.rui.au.reastatic.net/rui-static/img/rea-logo-v3.png" alt="realestate.com.au Australia lives here" />
              </a>
            </div>

        <?php endif ?>

        <div class="rui-clearboth"></div>
        <button class="rui-burger-toggle rui-icon rui-icon-navdeck rui-button-no-style">
            <span class="rui-visuallyhidden">Menu</span>
            <span class="hit-box"></span>
        </button>

    </div>

    <hr class="rui-clearboth"></div>
    <div class="rui-grid rui-nav-container rui-burger-container">
        <nav id="rui-main-nav" class="rui-main-nav">
            <ul>
                <li class="rui-nav-tab buy">
                    <a href="/buy" title="Real estate and property for sale">
                        <span>Buy</span>
                    </a>
                </li>
                <li class="rui-nav-tab rent">
                    <a href="/rent" title="Rental properties">
                        <span>Rent</span>
                    </a>
                </li>
                <li class="rui-nav-tab invest">
                    <a href="/invest" title="Property investment data">
                        <span>Invest</span>
                    </a>
                </li>
                <li class="rui-nav-tab sold">
                    <a href="/sold" title="Sold properties">
                        <span>Sold</span>
                    </a>
                </li>
                <li class="rui-nav-tab share">
                    <a href="/share" title="Share accommodation">
                        <span>Share</span>
                    </a>
                </li>
                <li class="rui-nav-tab new-homes">
                    <a href="/new-homes" title="New homes, land estates & off the plan apartments">
                        <span>New homes</span>
                    </a>
                </li>
                <li class="rui-nav-tab retire">
                    <a href="/retire" title="Retirement villages and communities">
                        <span>Retire</span>
                    </a>
                </li>
                <li class="rui-nav-tab agent">
                    <a href="/find-agent" title="Find a real estate agent">
                        <span>Find agents</span>
                    </a>
                </li>

                <li class="rui-nav-tab home-ideas">
                    <a href="/home-ideas" title="Home ideas">
                        <span>Home ideas</span>
                    </a>
                </li>
                <li class="rui-nav-tab blog rui-nav-active">
                    <a href="/news" title="Real estate news">
                        <span>News</span>
                    </a>
                </li>
                <li class="rui-nav-tab commercial">
                    <a href="http://www.realcommercial.com.au" target="_blank" title="Commercial real estate for sale and lease">
                        <span>Commercial</span>
                    </a>
                </li>
            </ul>
        </nav>
        <nav class="rui-mobile-nav">
            <ul>
                <li class="rui-nav-item home-page">
                    <a href="http://m.realestate.com.au/" title="realestate.com.au home page">
                        <span>Home</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-nav-inline buy">
                    <a href="http://m.realestate.com.au/buy" title="Real estate and property for sale">
                        <span>Buy</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-nav-inline rent">
                    <a href="http://m.realestate.com.au/rent" title="Rental properties">
                        <span>Rent</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-nav-inline sold">
                    <a href="http://m.realestate.com.au/sold" title="Sold properties">
                        <span>Sold</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-clear invest">
                    <a href="/invest" title="Property investment data">
                        <span>Invest</span>
                    </a>
                </li>
                <li class="rui-nav-item agent">
                    <a href="/find-agent" title="Find a real estate agent">
                        <span>Find Agents</span>
                    </a>
                </li>
                <li class="rui-nav-item suburb-profiles">
                    <a href="/neighbourhoods" title="Suburb profiles">
                        <span>Suburb Profiles</span>
                    </a>
                </li>
                <li class="rui-nav-item share">
                    <a href="/share" title="Share accommodation">
                        <span>Share</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-nav-active blog">
                    <a href="/news" title="realestate.com.au blog">
                        <span>News</span>
                    </a>
                </li>
                <li class="rui-nav-item retire">
                    <a href="/retire" title="Retirement villages and communities">
                        <span>Retire</span>
                    </a>
                </li>
                <li class="rui-nav-item rui-nav-item-external commercial">
                    <a href="http://www.realcommercial.com.au" target="_blank" title="Commercial real estate for sale and lease">
                        <span>Commercial</span>
                    </a>
                </li>
                <li class="rui-nav-item myrea rui-user-menu logged-out" style="">
                    <a href="/my-real-estate/login" title="Sign in">
                        <span>Sign in</span>
                    </a>
                </li>
                <li class="rui-nav-item myrea rui-user-menu logged-in" style="display: none;">
                    <a class="last" href="#" title="Logout">
                        <span></span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</header>

